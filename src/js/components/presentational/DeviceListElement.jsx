import React from 'react';

const DeviceListElement = ({ deviceName, deviceId, onConnect }) => {
    return (
        <div className="device-list-element">
            <p className="device-list-element-name">{ deviceName }</p>
            <p className="device-list-element-id">{ deviceId }</p>
            <button className="device-list-element-btn" id={deviceId} onClick={ (e) => onConnect(e, deviceName) }>Connect</button>
        </div>
    )
}

export default DeviceListElement;