import './App.css';
import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav} from 'react-bootstrap';

import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';


import UserLogin from './UserLogin';
import Home from './Home';

import Adduser from './adduser';
import Adminaxios from './adminaxios';
import Edituser from './edituser';
import Viewuser from './viewuser';
import Useraxios from './useraxios';
import AddAmount from './addamount';

import CurrentBalance from './currentadd';
import MiniStatement from './mini';


function App(props){
  return(
    <Fragment>
       <Router>
            <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand >
          <img
            
            />{' '}
      ABC Retail Banking
    </Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
    {/* <Nav.Link >
              <Link to="/AdminLogin">Admin Login</Link>
            </Nav.Link> */}
            <Nav.Link >
              <Link to="/UserLogin">Login</Link>
            </Nav.Link>
            <Nav.Link >
              <Link to="/Home">Home <img
             
            /></Link>
            </Nav.Link>

           
            </Navbar.Collapse>
    {/* <Button onClick={goFor}> forgot</Button> */}

    </Navbar>
    <Switch>
          <Route exact path="/" > <Redirect to='/Home' /></Route>
          
          

            
            <Route path="/UserLogin" component={UserLogin}></Route>
            <Route path="/Home" component={Home}></Route>
           

            <Route path="/adduser" component={Adduser}></Route>
          <Route path="/adminaxios" component={Adminaxios}></Route>
          <Route path="/edituser/:id" component={Edituser}></Route>
          <Route path="/viewuser/:id" component={Viewuser}></Route>
          <Route path="/useraxios" component={Useraxios}></Route>
          <Route path="/addamount" component={AddAmount}></Route>
          <Route path="/currentadd" component={CurrentBalance}></Route>
          <Route path="/mini/:id" component={MiniStatement}></Route>
          


          </Switch>
          </Router>
    </Fragment>
  )
}

export default App;