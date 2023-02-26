import './collection.css';
import useFetch from "../../hooks/useFetch";
import { useAccount } from 'wagmi';
import Contract from '../../components/contract/Contract';
import Navbar from '../../components/navbar/Navbar';


function Collection() {
  const { address } = useAccount()
  
  const {data, loading} = useFetch(`http://localhost:8000/api/owners/contracts/${address}`)

  console.log(data)

  return (
    <div className="collection">
      <Navbar />
      <div>
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
  );
}

export default Collection;