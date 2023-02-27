import './contract.css';
import { Link } from "react-router-dom";
import solscription from '../../solscription.json';
import { useContractRead } from 'wagmi';



function Contract({item}) {
    
    const contractReadName = useContractRead({
        address: item.contractAddress,
        abi: solscription.output.abi,
        functionName: '_name',
        chainId: item.chainID
    })
    const contractReadSymbol = useContractRead({
        address: item.contractAddress,
        abi: solscription.output.abi,
        functionName: '_symbol',
        chainId: item.chainID
    })

    /*
    const contractReadBaseUri = useContractRead({
        address: item.contractAddress,
        abi: solscription.output.abi,
        functionName: 'baseTokenURI',
        chainId: item.chainID
    })
    */

    return (
        <div className="contract">
            <Link to={`/contract/${item.contractAddress}`}>
                <img 
                    src={item.image} 
                    alt="" 
                    className="contractImg" 
                />
                <div className="contractDetails">
                    
                    <h2 className="siTitle">{item.contractAddress}</h2>
                    <span className="siGenre">{contractReadName.data}</span>
                    <span className="siGenre">{contractReadSymbol.data}</span>
                    <span className="siGenre">{item.deployTxn}</span>
                    <span className="siGenre">{item.chain}</span>
                    
                </div>
            </Link>
        </div>
    );
}

export default Contract;