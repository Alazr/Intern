import React,{useState} from 'react'
import Joi from 'joi-browser'


export default function useForm({initialValue,schema,doSubmit}){
const [data,setData] = useState(initialValue)
const [errors,setErros] = useState({})

const validation = ()=>{
    const newErrors = {}
    const {error} = Joi.validate(data,schema)
    if(!error)
        return null
    const val = error.details
    val.forEach(e=>
        newErrors[e.path[0]] = e.message 
        )

    return newErrors
}
const changeHandler = ({target}) =>{
    const newData = {...data}
    newData[target.name] = target.value
    setData(newData)
}

const submitHandler = (e)=>{
    e.preventDefault()
    const error = validation()
    setErros(error || {})
    if(error)
        return null
    doSubmit()
    
}

return {
    data,
    submitHandler,
    changeHandler,
    errors
}

}
