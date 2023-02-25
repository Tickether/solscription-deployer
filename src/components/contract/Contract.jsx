import './contract.css';
import { Link } from "react-router-dom";
import solscription from '../../solscription.json';
import { useContractRead } from 'wagmi';



function Contract({item}) {
    
    const contractReadName = useContractRead({
        address: item.contractAddress,
        abi: solscription.output.abi,
        functionName: '_name',
    })

    const contractReadBaseUri = useContractRead({
        address: item.contractAddress,
        abi: solscription.output.abi,
        functionName: 'baseTokenURI',
    })

    return (
        <div className="contract">
            <Link to={`/collections/${item.contractAddress}`}>
                <img 
                    src={item.image} 
                    alt="" 
                    className="contractImg" 
                />
                <div className="contractDesc">
                    <h1 className="siTitle">{item.contractAddress}</h1>
                    <span className="siGenre">{item.contractAddress}</span>
                    <span className="siRegion">{item.contractAddress}</span>
                    <span className="siLabel">{item.contractAddress}</span>
                </div>
            </Link>
        </div>
    );
}

export default Contract;