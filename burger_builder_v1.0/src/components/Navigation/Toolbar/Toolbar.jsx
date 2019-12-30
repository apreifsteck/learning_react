import React from 'react';

import NavItems from '../NavItems/NavItems'
import Logo from '../../Logo/Logo'

import classes from './Toolbar.module.css'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div onClick={props.menuClick} className={classes.DrawerToggle}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo />
            <nav className={classes.DesktopOnly}>
                <NavItems />
            </nav>
        </header>
    );
};
export default toolbar;