import React from "react";

const Navigation = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount () {
        if(window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(accounts);
        }
    }
    return (
        <nav>
            {isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount} >Connect Wallet</button>
            )}
        </nav>

    )
}

export default Navigation;