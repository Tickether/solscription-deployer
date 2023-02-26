import './App.css';
import { EthereumClient, modalConnectors, walletConnectProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia, goerli, arbitrum, mainnet, polygon } from "wagmi/chains";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Deploy from './pages/deploy/Deploy';
import Contract from './pages/contract/Contract';
import Profile from './pages/profile/Profile';
import Collection from './pages/collection/Collection';



function App() {
  
  const chains = [sepolia, goerli, arbitrum, mainnet, polygon];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "1c447251df031db3a6b7173e0ebd7f29" }),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: "1c447251df031db3a6b7173e0ebd7f29",
      version: "2",
      appName: "Solscription Deployer",
      chains,
    }),
    provider,
  });
  
  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <Router>
          <Routes>
            <Route path='/collection' element= {<Collection />} />
            <Route path='/profile' element= {<Profile />} />
            <Route path='/contract/:contractaddress' element= {<Contract />} />
            <Route path='/' element= {<Deploy />} />
          </Routes>
        </Router>
      </WagmiConfig>

      <Web3Modal
        projectId="1c447251df031db3a6b7173e0ebd7f29"
        ethereumClient={ethereumClient}
      />  
    </div>
  );
}

export default App;
