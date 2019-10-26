import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut';
import Orders from './containers/Orders/Orders';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
class App extends Component {

  componentDidMount() {
    this.props.onAuthExpires();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/Auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (<Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/logout" exact component={LogOut} />
        <Redirect to="/" />
      </Switch>);
    }
    return (

      <div className="App">
        <Layout>
          {routes}

        </Layout>


      </div>

    )


  }
}

const mapStateToProps = state => {

  return {
    isAuth: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {

  return {
    onAuthExpires: () => dispatch(actions.authExpiresTime())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
