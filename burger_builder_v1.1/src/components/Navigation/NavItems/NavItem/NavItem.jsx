import React from 'react';
// NavLink for styling the active class
import { NavLink } from 'react-router-dom'

import classes from './NavItem.module.css'

const navItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={props.link}
                exact
                activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </li>
    );
};
export default navItem;