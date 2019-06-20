import React from 'react';

const FileChooser = ({btnClassName, pClassName, btnTitle, fileName, onClick}) => {
    return (
        <div className="file-chooser">
            <button className={ btnClassName} onClick={ onClick }>{ btnTitle }</button>
            <p className={ pClassName }>{ fileName }</p>
        </div>
    )
}

export default FileChooser;