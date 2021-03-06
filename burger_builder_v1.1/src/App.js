import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Layout from './hocs/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

function App() {
  return (
    <BrowserRouter >
      <div >
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
