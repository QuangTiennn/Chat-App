import React from 'react';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
    return ( 
        <Router>
            <Route path="/" exact component={Join} />
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/chat" component={Chat} />
        </Router>
    )
};
export default App;
