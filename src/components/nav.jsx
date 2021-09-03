import React from 'react';
import menu from '../img/menu.svg'
import {Link} from 'react-router-dom'
function nav({user,isMobile,mobileChangeHandler}) {
    
    
    return (
        <div className="nav">
            <h2 className="logo">Intern</h2>
            <img className="icon menu" src={menu} alt="" onClick={mobileChangeHandler}/>
            <ul className={`list collapsible__content ${isMobile ? "active":""}`}>
                <li className="list__item">{user.name}</li>
                <li className="list__item"><Link to="/logout">logout</Link></li>
            </ul>
        </div>
    );
}

export default nav;