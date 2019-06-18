import React from 'react';


const ConnectionHeader = ({status, name, id}) => {
    let condition = status;
    return (
        <div className="conn-header">
            <p className="conn-status-label">Status:</p>
            <p className="conn-status">{ (condition) ? "Connected" : "Disconnected" }</p>
            <p className="conn-device-name-label">{ (condition) ? "Name:" : "" }</p>
            <p className="conn-device-name">{ (condition) ? name : "" }</p>
            <p className="conn-device-id-label">{ (condition) ? "Id:" : "" }</p>
            <p className="conn-device-id">{ (condition) ? id : "" }</p>
        </div>
    );
}

export default ConnectionHeader;