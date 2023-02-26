import './profile.css';
import useFetch from "../../hooks/useFetch";



function Profile() {
  
  const {data, loading, reFetch} = useFetch(`https://solscription-deployer-api.onrender.com/api/ownners/`)
  
  return (
    <div className="profile">
    </div>
  );
}

export default Profile;