import React from 'react';

import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hocs/Aux/Aux'

import classes from './Modal.module.css'


const modal = (props) => {

    const classNames = [classes.Modal]
    classNames.push(props.show ? classes.Show : classes.Hide)
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classNames.join(' ')}>
                {props.children}
            </div>
        </Aux>

    );
};
export default React.memo(modal);