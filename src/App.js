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

  async function getPosts(){
    const response = await urlClient.query(queryExplorePublications).toPromise();
    const posts = response.data.explorePublications.items.filter((post) => {
      if (post.profile) return post;
      return "";
    })
    setPosts(posts)
  }

  async function follow(id){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(LENS_HUB_CONTRACT_ADDRESS, LENSHUB, provider.getSigner())
    const tx = await contract.follow([parseInt(id)], [0x0]);
    await tx.wait();
  }

  useEffect(() => {
    getRecommendedProfiles();
    getPosts();
  }, []);

  return (
    <div className='app'>
      <Box>
        
      </Box>
    </div>
    
  );
}

export default App;
