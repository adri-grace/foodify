import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import userService from './utils/userService';
import 'bootstrap/dist/css/bootstrap.min.css';

//Reusable Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Page components
import Home from './pages/Home/Home';
import Restaurants from './pages/Restaurants/Restaurants';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import restaurantService from './utils/restaurantService';

class App extends Component {
  state = {
    user: userService.getUser(),
    restaurants: [],
    featuredRestaurants: []
  }
  handleSignUpOrLogin = () => {
    this.setState({ user: userService.getUser() }, () => {
      this.handleGetRestaurants();
    })
  }
  handleLogout = () => {
    // Call userService.logout();
    userService.logout();
    // Set user prop on state to null
    this.setState({ user: null, restaurants: [] })

  }
  handleGetFeaturedRestaurants = async () => {
      const {featuredRestaurants} = await restaurantService.getFeatured();
      this.setState({featuredRestaurants});
  }

  handleGetRestaurants = async () => {
    if(userService.getUser()) {
      const {restaurants} = await restaurantService.index();
      this.setState({restaurants});
    }
  }

  componentDidMount() {
    this.handleGetFeaturedRestaurants();
    this.handleGetRestaurants();
  }
  render() {
    return (
      <div className="App-outer" >
        <Navbar handleLogout={this.handleLogout} />
        <div className="App-inner">
          <Switch>
            <Route exact path="/" render={props =>
              <Home featuredRestaurants={this.state.featuredRestaurants}/>
            } />
            <Route exact path="/restaurants" render={props =>
              userService.getUser()
                ? <Restaurants 
                {...props} 
                restaurants={this.state.restaurants}
                handleGetRestaurants={this.handleGetRestaurants} />
                : <Redirect to="/login" />
            } />
            <Route exact path="/login" render={props =>
              <Login {...props} handleSignUpOrLogin={this.handleSignUpOrLogin} />
            } />
            <Route exact path="/signup" render={props =>
              <Signup
                {...props}
                handleSignUpOrLogin={this.handleSignUpOrLogin} />
            } />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
