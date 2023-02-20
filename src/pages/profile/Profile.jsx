import './profile.css';
import useFetch from "../../hooks/useFetch";



function Profile() {
  
  const {data, loading, reFetch} = useFetch(`https://api.tickether.io/api/ownners/`)
  
  return (
    <div className="profile">
    </div>
  );
}

export default Profile;