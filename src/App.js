import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Student from "./pages/student"
import Signin from "./pages/Signin"
import Admin from "./pages/admin.page"
import Adminsignin from "./pages/adminsignin"
import Teacher from "./pages/teacher.page"

const App = () => {
  return (
    <section className="App">
      <Router>
       {/* <Route exact path="/" component={IndexPage} /> */}
        <Route exact path="/student" component={Student} />
        <Route exact path="/student/:component" component={Student} />
        <Route exact path="/student-signin" component={Signin} />
        <Route exact path="/admin-signin" component={Adminsignin} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/:component" component={Admin} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/teacher/:component" component={Teacher} />
      </Router>
    </section>
  );
};

export default App