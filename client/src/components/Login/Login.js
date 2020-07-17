import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import './Login.css';  
const Login = ()=>{
    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function postLogin(){
        // const fetched = fetch('http://localhost:5000/api/login',{
        //     method : "GET",
        //     // headers : {"X-Requested-With" : 'XMLHttpRequest',
        //     //         "Content-Type" : "application/json; charset=utf-8",
        //     //         "Content-Length" : 185,
        //     //         "X-Powered-By" : "Express"}
        // })
        // .then((res) =>{
        //     return res.json();
        // })
        // .then((data)=>{
        //     console.log(data,'[data]');
        // })
        // .catch((err)=>{
        //     console.log(err,'[err]');
        // })

        axios.post('http://localhost:5000/api/login',{
            body : {
                'email' : email,
                'password' : password 
            }
        })
        .then((res)=>{
            console.log(res.data,'[res]');
        })
    }

return(
    <div className="joinOuterContainer">
        <div className='joinInnerContainer'>
            <h1 className='heading'>Login</h1>
            <div>
                <input placeholder='Email ...' className='joinInput' type='text' onChange={(event)=>setEmail(event.target.value)}></input>
            </div>
            <div>
                <input placeholder='Password ...' className='joinInput mt-20' type='password' onChange={(event)=> setPassword(event.target.value)}></input>
            </div>
            <Link onClick={event => (!email || !password) ? event.preventDefault(): null} to={'/'}>
                <button onClick={()=>{postLogin()}} className='button mt-20' type='submit'>Sign In</button>
            </Link>
        </div>
    </div>
)
};

export default Login;

