import React from 'react'

const ProgressBar = ({progress}) => {
    return (
        <div className="progress-bar-div">
            <div className="progress-bar-outer">
                <div className="progress-bar" style={{"width": `${progress * 0.7}vw`}}></div>
            </div>
            <p className="progress-bar-number">{ progress }</p>
        </div>
    );
}

export default ProgressBar;