import React from 'react';

import NavItems from '../NavItems/NavItems'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hocs/Aux/Aux'

import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {

    let sideDrawerClasses = [classes.SideDrawer, classes.Close]
    props.show ? sideDrawerClasses = [classes.SideDrawer, classes.Open] : sideDrawerClasses.push(classes.Close)

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={sideDrawerClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    );
};
export default sideDrawer;