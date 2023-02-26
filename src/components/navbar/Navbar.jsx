import './navbar.css';
import { Web3Button } from "@web3modal/react";
import { Link } from 'react-router-dom';


function Navbar() {

    
  
    return (
        <div className="navbar">
            <Link to='/'>
                <span className="">Deploy</span>
            </Link>
            <Link to='/collection'>
                <span className="">Collection</span>
            </Link>
            <Web3Button />
        </div>
  );
}

export default Navbar;
