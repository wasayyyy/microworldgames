import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import Main from './components/pages'
import Ledger from "./microworld/XRPLedger"
import AuthPage from './components/auth';
import RabbitRun from './microworld/RabbitRunCover'

class Routers extends Component {
    constructor(props) {
        super(props);

        this.state = {
          address: "",
          ledger: new Ledger()
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state, prevState, prevProps);
    }

    render() {
        return (
            <Routes basename="/microworldgames">
                <Route exact path='/' element={
                    <Main 
                        ledger={this.state.ledger} 
                        handleAddress={id => this.setState({ address: id })}
                        add={this.state.address} 
                    />
                }/>
                <Route exact path='/Auth' element={
                    <AuthPage 
                        ledger={this.state.ledger}
                    />
                }/>
                <Route exact path='/RabbitRun' element={ 
                    <RabbitRun 
                        ledger={this.state.ledger}
                    />
                }/>
            </Routes>
        )
    }
}

export default Routers;