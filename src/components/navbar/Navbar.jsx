import './navbar.css';
import { Web3Button } from "@web3modal/react";
import { Link } from 'react-router-dom';
import Logo from '../../assets/logos/solscription_logo_white_text.svg';


function Navbar() {

    
  
    return (
        <div className="navbar">
            <div className="navbarContainer">
                <div>
                    <img src={Logo} className="logo" />
                </div>
                <div className="navbarMenu">
                <Link to='/'>
                    <span className="navbarSpan">Deploy</span>
                </Link>
                <Link to='/collection'>
                    <span className="navbarSpan">Collection</span>
                </Link>
                </div>
                <div><Web3Button /></div>
            </div>
        </div>
  );
}

export default Navbar;
