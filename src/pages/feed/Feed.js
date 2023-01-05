import React, {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import Reactos from '../../Reactos.json';
import { useState } from 'react';

const ReactosContractAddress = "0xb7Bbde9357bC77710885E2d997C89bC467619508";

const Feed = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);
    const [mintMe, setMintMe] = useState({});

    async function mint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                ReactosContractAddress,
                Reactos.abi,
                signer
            )
            try{
                const response = contract.mint();
                console.log(`response: ${response}`);
            }catch (err){
                console.log(`Error: ${err.message}`)
            }
        }
    }

    return (
        <div>
            {isConnected ? (
            <p>Feed</p>
        ): (
            <h1>You must be connected</h1>
        )}
        </div>
        
    )
}

export default Feed;