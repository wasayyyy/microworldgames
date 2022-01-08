import React from "react";
import './style.css';

import HeaderPage from "./header"
import ContentPage from "./content"
import FooterPage from "./footer"

const IndexPage = (obj) => {
    return (
        <>
            <HeaderPage events={obj} />
            <ContentPage ledger={obj.ledger} />
            <FooterPage />
        </>
    );
}

export default IndexPage;