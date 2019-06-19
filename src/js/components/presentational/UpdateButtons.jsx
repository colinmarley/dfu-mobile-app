import React from 'react';

const UpdateButtons = ({onDfu, onInit, onFirmware, dfuReady, initSent, fimwareSent}) => {
    return (
        <div className="update-btn-div">
            <button className="dfu-btn" onClick={ (e) => onDfu(e) }>DFU Mode</button>
            <button className="init-btn" onClick={ (e) => onInit(e) }>Send Init File</button>
            <button className="firmware-btn" onClick={ (e) => onFirmware(e) }>Send Firmware File</button>
        </div>
    )
};

export default UpdateButtons;

