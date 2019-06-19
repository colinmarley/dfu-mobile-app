import React from 'react';

const UpdateButtons = ({onDfu, onInit, onFirmware, dfuReady, initSent, fimwareSent, dfuStyle, initStyle, firmwareStyle}) => {
    return (
        <div className="update-btn-div">
            <button className="dfu-btn" style={ dfuStyle } onClick={ (e) => onDfu(e) }>DFU Mode</button>
            <button className="init-btn" style={ initStyle } onClick={ (e) => onInit(e) }>Send Init File</button>
            <button className="firmware-btn" style={ firmwareStyle } onClick={ (e) => onFirmware(e) }>Send Firmware File</button>
        </div>
    )
};

export default UpdateButtons;

