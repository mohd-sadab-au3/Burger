import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut';
import Orders from './containers/Orders/Orders';
class App extends Component {


  render() {
    return (

      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/Auth" exact component={Auth} />
            <Route path="/logout" exact component={LogOut} />


          </Switch>

        </Layout>


      </div>

    )


  }
}

export default App;
