import React from 'react';

const FileChooser = ({btnClassName, pNameClassName, pUriClassName, divClassName, btnTitle, fileName, filePath, onClick}) => {
    return (
        <div className={ divClassName }>
            <button className={ btnClassName} onClick={ onClick }>{ btnTitle }</button>
            <p className={ pNameClassName }>{ fileName }</p>
            <p className={ pUriClassName }>{ filePath }</p>
        </div>
    )
}

export default FileChooser;