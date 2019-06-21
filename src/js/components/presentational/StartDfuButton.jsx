import React from 'react';

const StartDfuButton = ({btnTitle, onClick}) => {
    return (
        <div className="start-dfu-btn-div">
            <button className="start-dfu-btn" onClick={ (e) => onClick(e) }>{ btnTitle }</button>
        </div>
    );
}

export default StartDfuButton;