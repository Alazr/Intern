import React, { useEffect, useRef, useState } from 'react';
import Nav from './nav'
import Main from './main'
import resources from '../services/resourcesService' 
import {ToastContainer} from 'react-toastify'
import {toast} from 'react-toastify'

function Home({user}) {
    const [items,setItems]= useState([])
    const [selectedFile,setSelectedFile] = useState(null)
    const [fileuploaded,setFileUploaded] = useState(false)
    const [isMobile,setIsMobile] = useState(false)
    const btn = useRef()
    const onChangeHandler = e =>{
        setSelectedFile(e.target.files[0])
       
        }
        const onClickHandler = async () =>{
            const data = new FormData()
            data.append("file",selectedFile,selectedFile.name)
            
            try {
                toast.info("uploading...",{autoClose:1500})
                await resources.uploadFile(data)
                toast.success("file uploaded successfully")
                setFileUploaded(true)
                btn.current.value=null
                
            } catch (ex) {
                if(ex.response && ex.response.status === 400){
                toast.error("something failed")
            }
        }
    }

    const deleteHandler = async (id) =>{
        const originalItems = items
        const newItems = items.filter(item=>item._id != id)
        setItems(newItems)
        
        try {
            await resources.deleteFile(id)
            toast.success("file deleted successfully")
        } catch(ex) {
            if (ex.response && ex.response.status === 404){
                toast.error(ex.response.data)
            }
            setItems(originalItems)
        }
    }

    const mobileChangeHandler= ()=>{
        setIsMobile(!isMobile)
    }
    
    useEffect(()=>{
        const getItems = async ()=>{
            const {data} = await resources.getFiles()
            setItems(data)
        }
        getItems()
    },[fileuploaded])
    return (
        <>
        <ToastContainer autoClose={3000}/>
        <div className="home">
            <Nav user={user} isMobile={isMobile} mobileChangeHandler={mobileChangeHandler}/>
            <Main items={items} deleteHandler={deleteHandler}/>
            <div className="upload-section">
                <input ref={btn} type="file" onChange={onChangeHandler} />
            <button className="upload" onClick={onClickHandler}>upload</button>
            </div>
        </div>
        </>
    );
}

export default Home;