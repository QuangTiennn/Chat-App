import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Register.css';

const Register = () =>{
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [password_confirm, setPassword_comfirm] = useState('');

    function postRegister(){
        // const fetched = fetch('http://localhost:5000/api/register',{
        //     method : "POST",
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
        // console.log(fetched,'[fetched]');

        const getdata = axios.post('http://localhost:5000/api/register',{
            // headers:{
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     'Accept': 'application/json'
            // },
            body :{
               'name' : name,
               'email' : email,
               'password' : password,
               'password_confirm' : password_confirm
            }
        })
        .then((res)=>{
            console.log(res.data,'[res]');
        })
        .catch((err)=>{
            console.log(err,'[err]');
        })
        console.log(getdata,'[getdata]');
    }
    
    return(
        <div className="joinOuterContainer">
            <div className='joinInnerContainer'>
                <h1 className='heading'>REGISTER</h1>
                <form >
                    <div>
                        <input placeholder='Name ...' className='joinInput' type='text' onChange={(event)=>setName(event.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Email ...' className='joinInput mt-20' type='text' onChange={(event)=> setEmail(event.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Password...' className='joinInput mt-20' type='password' onChange={(event)=> setPassword(event.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Confirm Password...' className='joinInput mt-20' type='password' onChange={(event)=> setPassword_comfirm(event.target.value)} ></input>
                    </div>
                        <button onClick={()=> postRegister()}  className='button mt-20' type='button'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register;