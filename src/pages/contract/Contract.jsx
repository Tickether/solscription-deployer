import './contract.css';
import useFetch from "../../hooks/useFetch";



function Contract() {

  const {data, loading, reFetch} = useFetch(`https://solscription-deployer-api.onrender.com/api/contracts/:id`)
  
  return (
    <div className="contract">
    </div>
  );
}

export default Contract;