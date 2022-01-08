const xrpl = require("xrpl")

class Ledger {
    constructor() {
        this.PUBLIC_SERVER = "wss://xrplcluster.com/";
        this.client = new xrpl.Client(this.PUBLIC_SERVER);
        this.wallet = null;
        this.isConnected = false;
        this.errorOccured = false;
        this.errorMessage = "";
        this.request = {};
        this.xrpAddress = "";
    }

    init = async() => {
        await this.connect();

        if (this.isConnected) {
            console.log('Connected to the server!');

            if (process.env.REACT_APP_WALLET_DISTRIBUTER_SEED) {
                this.wallet = xrpl.Wallet.fromSeed(process.env.REACT_APP_WALLET_DISTRIBUTER_SEED);
                this.getAccountObjects("rwGW8L6ftKx6RPPfLqNJQyFP1haa8WtSgH");

                //this.sendPayment("ra61PADiBWf5zvmq9DwccnbJAiMxxPSmht", "0.4"); //SUCCESS
                //this.setTrustLine();

                // const bal = await this.getBalances(); SUCCESS
                // console.log(bal.length)

                // this.getLedgerData(); SUCCESS
            } else {
                this.errorOccured = true;
                this.errorMessage = "Distributer credentials is not valid!"
            }
        } else {
            this.errorOccured = true;
            this.errorMessage = "Failed to connect to the server!"
        }
    }


    /**
     * Connect the initialized client to the server
     * @returns Promise<void>
     * @returns A promise that resolves with a void value when a connection is established.
     */
    connect = async() => {
        await this.client.connect().then(() => {
            this.isConnected = this.isClientConnected();
        });
    }

    /**
     * Checks the initialized client connection to the server
     * @returns boolean
     */
    isClientConnected = () => {
        return this.client.isConnected();
    }

    isValidAddress = (address) => {
        return xrpl.isValidClassicAddress(address);
    }


    doTestRun = async() => {
        const test_wallet = xrpl.Wallet.fromSeed("sEdV7wfkswe6hbj8aqm3BrpZeeVnpSX");

        const response = await this.client.request({
            "command": "account_info",
            "account": test_wallet.address,
            "ledger_index": "validated"
        })

        console.log(response, test_wallet)

        // this.setTrustLine(test_wallet.address);
    }

    /**
     * Fetch the XRP balance of the specified address
     * @param {string} address 
     * @returns Promise<string>
     * @returns The XRP balance of the account (as a string).
     */
    getXRPAddressBalance = async(address) => {
        const balance = await this.client.getXrpBalance(address);
        return balance;
    }

    /**
     * Fetch the balances of the specified address
     * @param {string} address 
     * @returns Promise<{ currency: string; issuer?: string; value: string }[]>
     * @returns An array of XRP/non-XRP balances for the given account.
     */
    getBalances = async(address) => {
        if (this.errorOccured) {
            console.log('Error : ' + this.errorMessage);
            return;
        }

        let xAddress = this.clientAddress;

        if (address) {
            xAddress = address;
        }

        const bal = await this.client.getBalances(xAddress);
        return bal;
    }

    /**
     * 
     * @returns 
     */
    fundWallet = async() => {
        const { wallet, balance } = await this.client.fundWallet();

        return { wallet, balance };
    }


    /**
     * Disconnect the initialized client to the server
     * @returns Promise<void>
     * @returns A promise that resolves with a void value when a connection is destroyed.
     */
    disconnect = () => {
        this.client.disconnect();
    }

    sendPayment = async(address, amount) => {
        const txJson = {
            "TransactionType": "Payment",
            "Account": "rUHANRAVMVCiYb6Sn7KdmhYGhAd9iEAWVz",
            "Amount": xrpl.xrpToDrops(0.4),
            "Destination": address
        };

        const prepared = await this.autoFill(txJson);
        const max_ledger = prepared.LastLedgerSequence
        console.log("Prepared transaction instructions:", prepared)
        console.log("Transaction cost:", prepared.Fee, "XRP")
        console.log("Transaction expires after ledger:", max_ledger)

        const signed = this.wallet.sign(prepared)
        console.log("Identifying hash:", signed.hash)
        console.log("Signed blob:", signed.tx_blob)

        const tx = await this.submitTransaction(signed.tx_blob)
        console.log("Transaction result:", tx.result.meta.TransactionResult)
        console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
    }

    setTrustLine = async(address) => {
        const txJson = {
            "TransactionType": 'TrustSet',
            "Account": address,
            "LimitAmount": {
                "currency": 'FOO',
                "issuer": address,
                "value": '10000000000',
            },
            "Flags": {
                "tfSetNoRipple": true
            }
        }

        const prepared = await this.autoFill(txJson);
        const max_ledger = prepared.LastLedgerSequence
        console.log("Prepared transaction instructions:", prepared)
        console.log("Transaction expires after ledger:", max_ledger)

        const signed = this.wallet.sign(prepared)
        console.log("Identifying hash:", signed.hash)
        console.log("Signed blob:", signed.tx_blob)

        const tx = await this.submitTransaction(signed.tx_blob)
        console.log("Transaction result:", tx.result.meta.TransactionResult)
        console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
    };

    /////////////////////////////////CORE API/////////////////////////////////////////
    /**
     * Autofills fields in a transaction. 
     * This will set Sequence, Fee, lastLedgerSequence 
     * according to the current state of the server this Client is connected to. 
     * It also converts all X-Addresses to classic addresses and flags interfaces into numbers.
     * @param {TRANSACTION in JSON format} transaction 
     * @param {int} signersCount 
     * @returns Promise<T>
     */
    autoFill = (transaction, signersCount) => {
        const response = this.client.autofill(transaction);
        return response;
    }

    submitTransaction = async(transaction) => {
        const response = await this.client.submitAndWait(transaction);

        return response;
    }

    getAccountChannel = async(address) => {
        const response = await this.client.requestAll({
            "account": address,
            "command": "account_channels"
        });

        console.log('response', response)
    }

    getAccountLines = async(address) => {
        const response = await this.client.requestAll({
            "account": address,
            "command": "account_lines"
        });

        console.log('response', response)
    }

    getAccountInfo = async(address) => {
        const response = await this.client.request({
            "account": address,
            "command": "account_info"
        })

        console.log('response', response);
    }

    getAccountCurrencies = async(address) => {
        const response = await this.client.request({
            "account": address,
            "command": "account_currencies"
        })

        console.log('response', response);
    };

    getAccountObjects = async(address) => {
        const response = await this.client.requestAll({
            "account": address,
            "command": "account_objects"
        });

        console.log('response', response)
    }

    getLedgerData = async() => {
        const response = await this.client.request({
            "command": "ledger_data"
        })

        console.log('response', response);
    }

    getLedger = async() => {
        const response = await this.client.request({
            "command": "ledger"
        })

        console.log('response', response);
    }
}

export default Ledger;