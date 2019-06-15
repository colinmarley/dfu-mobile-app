import React, { Component } from 'react';

const ScanButton = ({ onClick }) => {
    return (
        <div className="scan-btn-div">
            <button className="scan-btn" onClick={ onClick }>Scan</button>
        </div>
    );
}

export default ScanButton;