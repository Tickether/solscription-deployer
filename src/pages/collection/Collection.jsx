import './collection.css';
import useFetch from "../../hooks/useFetch";
import { useAccount } from 'wagmi';
import Contract from '../../components/contract/Contract';


function Collection() {
  const { address } = useAccount()
  
  const {data, loading} = useFetch(`https://solscription-deployer-api.onrender.com/api/owners/contracts/${address}`)

  console.log(data)

  return (
    <div className="collection">
      <div className="collectionContainer">
        <div className="collectionWrapper">
          {loading ? (
            "loading"
          ) : (
            <>
              {data.map(item=>(
                  <Contract item={item} key={item.contractAddress}/>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;