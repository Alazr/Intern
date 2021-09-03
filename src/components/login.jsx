import React,{useState} from 'react';
import InputGroup from '../shared/inputGroup';
import Joi from 'joi-browser'
import useForm from '../shared/useForm'
import auth from '../services/authService'
import {Link} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {toast} from 'react-toastify'

function Login() {

    const account = {
        email:"",
        password:"",
    }
    

    const submitLogin = async () =>{
        try {
            await auth.login(data)
            toast.success("logged in successfully")
            window.location = "/"
        } catch (ex) {
            if(ex.response && ex.response.status === 400){
                toast.error(ex.response.data)
            }
        }
    }
    const loginSchema = {
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    }
    
    const {data,submitHandler,changeHandler,errors} = useForm(
        {
            initialValue:account,
            schema:loginSchema,
            doSubmit:submitLogin
        }
    )

    return (
        <>
       <ToastContainer autoClose={3000}/>
        <div className="registration">
            <h2>Login</h2>
           <form onSubmit={submitHandler}>
           <InputGroup error={errors.email} onChange={changeHandler} value={data.email} name="email" label="Email" type="email"/>
               <InputGroup error={errors.password} onChange={changeHandler} value={data.password} name="password" label="Password" type="password"/>
               
                <button className="btn" type='submit'>Login</button>
           </form>
           <div className="sug">
           <p>Create New Account</p><Link to="/register">Signup</Link>
           </div>
        </div>
        </>
    );
}







export default Login;