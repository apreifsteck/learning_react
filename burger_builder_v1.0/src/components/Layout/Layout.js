import React from 'react';
import Aux from '../../hocs/Aux'

import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div>Toolbar, Sidebar, Backdrop</div>
        <div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>
    </Aux>

);

export default layout;