import React from 'react';
import InputGroup from '../shared/inputGroup';
import Joi from 'joi-browser'
import useForm from '../shared/useForm'
import { useHistory } from 'react-router-dom';
import {registerUser} from '../services/user'
import auth from '../services/authService'
import {Link} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {toast} from 'react-toastify'

function Register() {
    const registerSchema = {
        name:Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).required(),
        confirm:Joi.string().valid(Joi.ref("password")).required().options({
            language: {
              any: {
                allowOnly: '!!Passwords do not match',
              }
            } 
          })
    }
    const acc = {
        name:"",
        email:"",
        password:"",
        confirm:""
    }
    const hist = useHistory()
    const submitRegister = async ()=>{

        try {
            const res = await registerUser(data) 
            auth.loginWithJwt(res.headers["x-auth-token"])
            toast.success("account created successfully")
            hist.push("/")
            
        } catch (ex) {
           if(ex.response && ex.response.status === 400){
               toast.error(ex.response.data)
           }
        
        }
        
    }
    const {data,submitHandler,changeHandler,errors} = useForm(
        {
            initialValue:acc,
            schema:registerSchema,
            doSubmit:submitRegister
        }
    )


    return (
        <>
        <ToastContainer autoClose={3000}/>
        <div className="registration">
            <h2 className="register__title">Register</h2>
           <form onSubmit={submitHandler}>
               <InputGroup error={errors.name}  onChange={changeHandler} value={data.name} name="name" label="UserName" type="text"/>
               <InputGroup error={errors.email} onChange={changeHandler} value={data.email} name="email" label="Email" type="email"/>
               <InputGroup error={errors.password} onChange={changeHandler} value={data.password} name="password" label="Password" type="password"/>
               <InputGroup error={errors.confirm} onChange={changeHandler} value={data.confirm} name="confirm" label="Confirm password" type="password"/>
                <button className="btn" type='submit'>Register</button>
           </form>
           <div className="sug">
           <p>Do you have an account?</p><Link to="/login">Login</Link>
           </div>
        </div>
        </>
    );
}



export default Register;