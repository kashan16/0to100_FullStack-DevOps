import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


const Nav = () => {

    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        if(isLoggedIn) {
            navigate("/Contact");
        } else {
            navigate("/Login");
        }
    }

    return (
    <div>
        <nav>
            <NavLink to = "./Home"
                className = {({ isActive , isPending }) => 
                isPending ? "pending" : isActive ? "active" : ""}>Home</NavLink>
            <Link to = "./About">About</Link>
            <button onClick = {login}>Go to contacts</button>
        </nav>
    </div>
  )
}

export default Nav