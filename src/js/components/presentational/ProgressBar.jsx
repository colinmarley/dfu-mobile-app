import React from 'react'

const ProgressBar = ({ progress, onDone }) => {
    return (
        <div className="progress-bar-div">
            <div className="progress-bar-outer">
                <div className="progress-bar" style={{"width": `${progress * 0.7}vw`}}></div>
                <p className="progress-bar-number">{ progress }</p>
            </div>
            <button className="dfu-finish-btn" onClick={ (e) => {onDone(e);} }>Done</button>
        </div>
    );
}

export default ProgressBar;