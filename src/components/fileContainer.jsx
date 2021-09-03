import React from 'react';
import File from "./file"
function fileContainer({items,deleteHandler}) {
    return (
        <div className="files-container">
            {
                items.map(item=>
                    <File key={item._id} data={item} onDelete={deleteHandler}/>
                    )
            }
        </div>
    );
}

export default fileContainer;