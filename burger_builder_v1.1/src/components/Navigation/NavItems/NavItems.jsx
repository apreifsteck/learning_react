import React from 'react';

import NavItem from './NavItem/NavItem'

import classes from './NavItems.module.css'

const navItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/">Burger Builder</NavItem>
            <NavItem link="/orders">Orders</NavItem>
        </ul>
    );
};
export default navItems;