import React, { useState } from 'react';
import api from './api';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {

  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      })
    } else {
      console.log("Details do not match!");
      setError("Details do not match!")
    }
  }

  const Logout = () => {
    setUser({
      name: "",
      email: ""
    })
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={LoginForm} />
          {(user.email != "") ? (
          <div className="welcome">
              <h2> Welcome, <span>{user.name}</span> </h2>
              <button onClick={Logout}>Logout</button>

            </div>
          ) : (
              <LoginForm Login={Login} error={error} />
            )}
        </Switch>
      </div>
    </Router>
  )
}

export default App;
