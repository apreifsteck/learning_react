import React from 'react';
import Aux from '../../hocs/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'

import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div>Toolbar, Sidebar, Backdrop</div>
        <Toolbar />
        <div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>
    </Aux>

);

export default layout;