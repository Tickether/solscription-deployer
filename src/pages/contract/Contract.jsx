import './contract.css';
import useFetch from "../../hooks/useFetch";



function Contract() {

  const {data, loading, reFetch} = useFetch(`https://api.tickether.io/api/contracts/:id`)
  
  return (
    <div className="contract">
    </div>
  );
}

export default Contract;