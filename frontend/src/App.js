import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListInventoryComponent from './components/ListInventoryComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateInventoryComponent from './components/CreateInventoryComponent';
import ViewInventoryComponent from './components/ViewInventoryComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route exact path = "/"  component =
                              {ListInventoryComponent}></Route>
                          <Route path = "/inventories" component = 
                              {ListInventoryComponent}></Route>
                          <Route path = "/add-user/:id" component = 
                              {CreateInventoryComponent}></Route>
                          <Route path = "/view-inventory/:id" component = 
                              {ViewInventoryComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
