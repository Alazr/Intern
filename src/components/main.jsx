import React from 'react';
import FileContainer from './fileContainer';

function main({items,deleteHandler}) {
    return (
        <div className="main">
            <FileContainer deleteHandler={deleteHandler} items={items}/>
        </div>
    );
}

export default main;