import React from 'react';
import resources from '../services/resourcesService';
import dl from "../img/delete.svg";

function file({data,onDelete}) {
    const type = data.mimetype.split("/")
    const path = data.path.slice(5)
    if(type[0]  == "image" ){
        return (
            <div className="file">
                <img className="file__content" src={resources.getData(path)} alt="" />
                <img className="icon del--icon" src={dl} alt="" onClick={()=>onDelete(data._id)} />
            </div>
        );
    }
    if(type[0]  == "video" ){
        return (
            <div className="file">
                <video className="file__content" src={resources.getData(path)}></video>
                <img className="icon del--icon" src={dl} alt="" onClick={()=>onDelete(data._id)} />
            </div>
        );
    }
    if(type[0]  == "audio" ){
        return (
            <div className="file">
                <audio className="file__content" >
                        <source src={resources.getData(path)} type="audio/mp3"/>
                </audio>
                <img className="icon del--icon" src={dl} alt="" onClick={()=>onDelete(data._id)} />
            </div>
        );
    }
   
}

export default file;