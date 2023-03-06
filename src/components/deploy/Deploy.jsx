import './deploy.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import solscriptionDeployer from '../../solscriptionDeployer.json';
import { usePrepareContractWrite, useContractWrite, useAccount, useNetwork, useWaitForTransaction } from 'wagmi';
import useFetch from '../../hooks/useFetch';


function Deploy( {setOpen} ) {

  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  const [contractAddress, setContractAddress] = useState('')
  const [ details, setDetails] = useState({
    name: 'Test',
    symbol: 'TT',
    feeDollar: '0',
    feeNative: '0',
    maxMonths: '12'
  });

  const {data} = useFetch(`https://solscription-deployer-api.onrender.com/api/owners/${address}`)

  console.log(data)


  const handleChange = (e) => {
    setDetails((prev)=>({...prev, [e.target.id]:e.target.value}))
  };

  let arg = Object.values(details)

  
  useEffect(()=> {
    if(isConnected){
      if (chain.network === 'sepolia') {
        setContractAddress('0x611Ea02425A83Ab6018e7149166ECf2E48D8F0CA')
      } else if (chain.network === 'goerli') {
        setContractAddress('0xC5aB24Cb19D03A548058F934CA9fC165226C0b9d')
      }      
    }
    
  }, [chain, isConnected])
  
  

  const { config, error } = usePrepareContractWrite({
    address: contractAddress, 
    abi: solscriptionDeployer.output.abi,
    functionName: 'createSolscriptionContract',
    args: [ arg[0], arg[1], arg[2], arg[3], arg[4]]
  })

  const contractWrite  = useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  })
  
  console.log(waitForTransaction.data?.logs[0].address)
  console.log(waitForTransaction.isSuccess)

  useEffect(()=> {
    if (waitForTransaction.isSuccess) {
      if (data === null) {
        const owner = ({
          walletAddress: address,
          username: address
        });
        const ownerRes = axios.post('https://solscription-deployer-api.onrender.com/api/owners', owner);
        console.log(ownerRes)

        const contract = ({
          creator: address,
          owner: address,
          chain: chain.network,
          chainID: chain.id,
          deployTxn: contractWrite.data?.hash,
          contractAddress: waitForTransaction.data?.logs[0].address,
        });
        const contractRes = axios.post(`https://solscription-deployer-api.onrender.com/api/contracts/${address}`, contract);
        console.log(contractRes)  

      } else {
        
        const contract = ({
          creator: address,
          owner: address,
          chain: chain.network,
          chainID: chain.id,
          deployTxn: contractWrite.data?.hash,
          contractAddress: waitForTransaction.data?.logs[0].address,
        });
        const contractRes = axios.post(`https://solscription-deployer-api.onrender.com/api/contracts/${address}`, contract);
        console.log(contractRes)

      }
      console.log('yhhhh')
      setOpen(false)
    }

  }, [waitForTransaction, address, data, chain, contractWrite, setOpen])
  
  const handleCreate = async () => {
    try {
      await contractWrite.writeAsync?.()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="deploy">
      <div className='deployContainer'>
        <div className='deployFormWrapper'>
          <div className='deployForm'>
            <div className='deployInputWrapper'>
              <label>Name</label>
              <input 
                  type="text" 
                  placeholder= {arg[0]} 
                  id='name' 
                  onChange={handleChange} 
                  required
              />
            </div>
            <div className='deployInputWrapper'>
              <label>Symbol</label>
              <input 
                  type="text" 
                  placeholder= {arg[1]}  
                  id='symbol' 
                  onChange={handleChange} 
                  required
              />
            </div>
            <div className='deployInputWrapper'>
              <label>Fee in Dollars</label>
              <input 
                  type="number" 
                  placeholder= {arg[2]}  
                  id='feeDollar' 
                  onChange={handleChange} 
                  required
              />
            </div>
            <div className='deployInputWrapper'>
              <label>Fee in Crypto</label>
              <input 
                  type="number" 
                  placeholder= {arg[3]} 
                  id='feeNative' 
                  onChange={handleChange} 
                  required
              />
            </div>
            <div className='deployInputWrapper'>
              <label>Number of Months</label>
              <input 
                  type="number" 
                  placeholder= {arg[4]} 
                  id='maxMonths' 
                  onChange={handleChange} 
                  required
              />
            </div>
          </div>
          <div className='deployButtonWrapper'>
            <button className='deployButton' disabled={ !isConnected || contractWrite.isLoading || waitForTransaction.isLoading } onClick={handleCreate}>
              Create
            </button>
            <button className='deployCancelButton' onClick={() => setOpen(false)}>
              Cancel
            </button>
            {error && (
              <div>An error occurred preparing the transaction: {error.message}</div>
            )}
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Deploy;