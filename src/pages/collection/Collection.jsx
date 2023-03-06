import './collection.css';
import useFetch from "../../hooks/useFetch";
import { useAccount } from 'wagmi';
import Contract from '../../components/contract/Contract';
import { useState } from 'react';
import Deploy from '../../components/deploy/Deploy';


function Collection() {
  const { address } = useAccount()

  const[openModal, setOpenModal] = useState(false)
  
  const {data} = useFetch(`https://solscription-deployer-api.onrender.com/api/owners/contracts/${address}`)

  console.log(data)

  return (
    <div className="collection">
      <div className="collectionContainer">
        <div className="collectionWrapper">
          {data.length === 0 ? (
            <>
              <div className="collectionWelcomeWrapper">
                <span>New here? Check out thegetting started guide ↗</span>
              </div>
              <div className="collectionLowerWrapper">
                <div className="collectionOpionsWrapper">
                  <span>Sols</span>
                  <span>Transactions</span>
                </div>
                <div className="collectionButtonWrapper">
                  <button 
                  className="collectionButton"
                  onClick={() => setOpenModal(true)}
                  >
                    Create
                  </button>
                </div>
                <div className="collectionEmptyWrapper">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>
                    <span>Create a new Solscription</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {data.map(item=>(
                  <Contract item={item} key={item.contractAddress}/>
              ))}
            </>
          )}
        </div>
      </div>
      {openModal && <Deploy setOpen={setOpenModal} />}
    </div>
  );
}

export default Collection;