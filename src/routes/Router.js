import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import UploadCourses from '../pages/UploadCourses';
import CourcesDetails from '../pages/CourcesDetails';
import Carts from '../pages/Carts';
import Checkout from '../pages/Checkout';
import MyCourses from '../pages/MyCourses';

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

const Router = (props) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/details/:id" component={CourcesDetails} />
    <Route path="/about" component={About} />

    <PrivateRoute path='/carts' component={Carts} />
    <PrivateRoute path='/checkout' component={Checkout} />
    <PrivateRoute path='/upload' component={UploadCourses} />
    <PrivateRoute path='/my-courses' component={MyCourses} />


    {/* <Route path="/carts" component={Carts} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/upload" component={UploadCourses} />
        <Route path="/my-courses" component={MyCourses} /> */}



  </Switch>
)
export default Router;