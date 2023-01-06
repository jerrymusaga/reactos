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
  console.log(`profiles:- ${profiles}`)
  const [posts, setPosts] = useState([]);
  console.log(`posts:- ${posts}`)

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
      <Box width="100%" backgroundColor="rgba(5,32,64,28)">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="55%"
          margin="auto"
          color="white"
          padding="10px 0"  
        >
          <Box>
            <Box fontSize="45px" fontFamily="DM Serif Display">
              Reactos
            </Box>
          </Box>

          {accounts ? (
            <Box backgroundColor="000" padding="15px" borderRadius="6px">
              Connected
            </Box>
          ) : (
            <Button onClick={connectAccount} color="rgba(5,32,64)" _hover={{backgroundColor:"#808080"}}>
              Connect Wallet
            </Button>
          )}

        </Box>

      </Box>

      {/*FEED SECTION */}
      <Box
        display="flex"
        justifyContent="space-between"
        width="55%"
        margin="35% auto auto auto"
        color="white"
      >
        {/* POSTS */}
        <Box width="65%" maxWidth="65%" minWidth="65%">
            {
              posts.map((post) => (
                <Box key={post.id} marginBottom="25px" backgroundColor="rgba(5,32,64,28)" padding="40px 30px 40px 25px" borderRadius="6px">
                  <Box display="flex">
                    {/*Profile image */}
                    <Box width="75px" height="75px" marginTop="8px">
                      <img
                        alt="profile"
                        src=""
                      />
                    </Box>
                  </Box>
                </Box>
              ))
            }
        </Box>

        {/*Friend Suggestions */}
        <Box></Box>
      </Box>

    </div>
    
  );
}

export default App;
