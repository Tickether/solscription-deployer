import './collection.css';
import useFetch from "../../hooks/useFetch";


function Collection() {
  
  const {data, loading, reFetch} = useFetch(`https://api.tickether.io/api/contracts`)

  return (
    <div className="collection">
    </div>
  );
}

export default Collection;