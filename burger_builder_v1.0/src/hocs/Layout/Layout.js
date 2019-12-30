import React, { Component } from 'react';
import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import classes from './Layout.module.css'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerOpenHandler = () => {
        this.setState({ showSideDrawer: true });
    }

    render() {
        return (
            <Aux>
                <div>Toolbar, Sidebar, Backdrop</div>
                <Toolbar menuClick={this.sideDrawerOpenHandler} />
                <SideDrawer closed={this.sideDrawerClosedHandler} show={this.state.showSideDrawer} />
                <div>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </div>
            </Aux>);
    }
}

export default Layout;