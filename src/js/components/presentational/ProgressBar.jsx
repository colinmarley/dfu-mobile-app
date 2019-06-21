import React from 'react'

const ProgressBar = ({progress}) => {
    return (
        <div className="progress-bar-div">
            <p className="progress-bar-number">{ progress }</p>
        </div>
    );
}

export default ProgressBar;