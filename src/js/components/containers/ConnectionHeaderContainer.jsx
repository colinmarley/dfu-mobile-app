import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bleMod } from '../../libs/ble/bleMod';
import { setConnectedDevice, setConnectionStatus } from '../../actions/index';

import ConnectionHeader from '../presentational/ConnectionHeader';


const mapStateToProps = (state, ownProps) => ({
    isConnected: state.ble.isConnected,
    connectedDevice: state.ble.connectedDevice,

    isBrowser: state.device.isBrowser
});

const mapDispatchToProps = dispatch => ({
    setConnectedDevice: device => { dispatch(setConnectedDevice(device)); },
    setConnectionStatus: isConnected => { dispatch(setConnectionStatus(isConnected)); }
});

class ConnectionHeaderContainer extends Component {
    constructor(props) {
        super(props);

        this.onDisconnect = this.onDisconnect.bind(this);
        this.onDisconnectSuccess = this.onDisconnectSuccess.bind(this);
        this.onDisconnectError = this.onDisconnectError.bind(this);
    }

    onDisconnect(e, id) {
        if (!this.props.isBrowser) {
            bleMod.disconnect(id, this.onDisconnectSuccess, this.onDisconnectError);
        } else {
            this.onDisconnectSuccess();
        }
    }

    onDisconnectSuccess(result = '') {
        this.props.setConnectionStatus(false);
        this.props.setConnectedDevice({name: "", id: ""});
        document.querySelector(".scan-btn-div").style.display = "block";
        
    }

    onDisconnectError(error) {
        console.log("Reached onDisconnectError");
        console.log(error);
    }

    render() {
        return (
            <div className="conn-header-div">
                <ConnectionHeader onDisconnect={ this.onDisconnect } status={ this.props.isConnected } name={ this.props.connectedDevice.name } id={ this.props.connectedDevice.id } />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionHeaderContainer);