import './deploy.css';
import axios from 'axios';
import { useState } from 'react';
import solscriptionDeployer from '../../solscriptionDeployer.json';
import { usePrepareContractWrite, useContractWrite, useAccount, useNetwork, useWaitForTransaction } from 'wagmi';


function Deploy() {

  const [ details, setDetails] = useState({
    name: 'Test',
    symbol: 'TT',
    feeDollar: '0',
    feeNative: '0',
    maxMonths: '12'
});

//console.log(Object.values(details))

  const handleChange = (e) => {
    setDetails((prev)=>({...prev, [e.target.id]:e.target.value}))
  };

  let arg = Object.values(details)

  const { config, error } = usePrepareContractWrite({
    address: '0xC5aB24Cb19D03A548058F934CA9fC165226C0b9d', 
    abi: solscriptionDeployer.output.abi,
    functionName: 'createSolscriptionContract',
    args: [ arg[0], arg[1], arg[2], arg[3], arg[4]]
  })

  const contractWrite  = useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  })
  




  const { address } = useAccount()
  const { chain } = useNetwork()
  
  console.log(waitForTransaction.data?.logs[0].address)
  console.log(waitForTransaction.isSuccess)

  
  const handleCreate = async () => {
    try {
      await contractWrite.writeAsync?.()
      
      do {
        console.log(waitForTransaction.data?.logs[0].address)
        
        const contract = ({
          creator: address,
          owner: address,
          chain: chain.network,
          deployTxn: contractWrite.data?.hash,
          contractAddress: waitForTransaction.data?.logs[0].address,
        });
        const res = await axios.post('https://api.tickether.io/api/auth/register', contract);
        
        setInterval(() => {}, 10000);

      } while (!waitForTransaction.data?.logs[0].address);
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="deploy">
      <div>
        <label>Name</label>
        <input 
            type="text" 
            placeholder= {arg[0]} 
            id='name' 
            onChange={handleChange} 
            required
        />
        <label>Symbol</label>
        <input 
            type="text" 
            placeholder= {arg[1]}  
            id='symbol' 
            onChange={handleChange} 
            required
        />
        <label>Fee in Dollars</label>
        <input 
            type="number" 
            placeholder= {arg[2]}  
            id='feeDollar' 
            onChange={handleChange} 
            required
        />
        <label>Fee in Crypto</label>
        <input 
            type="number" 
            placeholder= {arg[3]} 
            id='feeNative' 
            onChange={handleChange} 
            required
        />
        <label>Number of Moths</label>
        <input 
            type="number" 
            placeholder= {arg[4]} 
            id='maxMonths' 
            onChange={handleChange} 
            required
        />
      </div>
      <div>
        <button disabled={contractWrite.isLoading} onClick={handleCreate}>
          Create
        </button>
        {error && (
          <div>An error occurred preparing the transaction: {error.message}</div>
        )}
      </div>

    </div>
  );
}

export default Deploy;