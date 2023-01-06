import './App.css';
import { useState, useEffect} from 'react';
import { urlClient,LENS_HUB_CONTRACT_ADDRESS,queryExplorePublications,queryRecommendedProfiles } from './queries';
import LENSHUB from './lens_hub.json';
import { ethers } from 'hardhat';
import { Box, Button, Image } from '@chakra-ui/react';

import Feed from './pages/feed/Feed';
import Navigation from './components/navigation/Navigation';

function App() {
  const [accounts, setAccounts] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);

  async function connectAccount () {
    if(window.ethereum){
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        setAccounts(accounts[0]);
    }
  }

  async function getRecommendedProfiles(){
    const response = await urlClient.query(queryRecommendedProfiles).toPromise();
    const profiles = response.data.recommendedProfiles.slice(0,5);
    setProfiles(profiles);
  }

  return (
    <div className='overlay'>
      <div className="App">
        <Navigation accounts={accounts} setAccounts={setAccounts} />
        <Feed accounts={accounts} setAccounts={setAccounts} /> 
      </div>
      <div className='moving-background'>

      </div>
    </div>
    
  );
}

export default App;
