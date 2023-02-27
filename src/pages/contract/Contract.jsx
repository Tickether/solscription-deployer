import './contract.css';
import useFetch from "../../hooks/useFetch";
import solscription from '../../solscription.json';
import { useContractRead } from 'wagmi';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useEffect } from 'react';



function Contract() {

  const location = useLocation();

  const contractAddress = location.pathname.split("/")[2];

  const {data, loading} = useFetch(`https://solscription-deployer-api.onrender.com/api/contracts/${contractAddress}`)
  
  console.log(data)


  const contractReadName = useContractRead({
    address: contractAddress,
    abi: solscription.output.abi,
    functionName: '_name',
    chainId: data.chainID
  })

  const contractReadSymbol = useContractRead({
    address: contractAddress,
    abi: solscription.output.abi,
    functionName: '_symbol',
    chainId: data.chainID
})
  
  return (
    <div className="contract">
      <Navbar />
      <div className="contractContainer">
        {loading ? (
          "loading"
        ) : (
          <div>
            <p>{contractReadName.data}</p>
            <p>{contractReadSymbol.data}</p>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Contract;