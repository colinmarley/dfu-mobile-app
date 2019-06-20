import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setConnectedDevice, setConnectionStatus } from '../../actions/index';

import { bleMod } from '../../libs/ble/bleMod';


import DeviceListElement from '../presentational/DeviceListElement';

const mapStateToProps = (state, ownProps) => ({
    isBrowser: state.device.isBrowser
});

const mapDispatchToProps = dispatch => ({
    setConnectedDevice:  device => { dispatch(setConnectedDevice(device)); },
    setConnectionStatus:  isConnected => { dispatch(setConnectionStatus(isConnected)); }
});

class DeviceList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            deviceList: []
        }

        this.onConnect = this.onConnect.bind(this);
        this.onConnectSuccess = this.onConnectSuccess.bind(this);
        this.onConnectError = this.onConnectError.bind(this);
    }

    componentDidMount() {
        let devices = [];
        

        this.props.devices.forEach( device => {
            devices.push(
                <DeviceListElement deviceName={device.name} deviceId={device.id} />
            );
        });
        
        if (this.state.deviceList.length != devices.length) {
            this.setState({
                deviceList: devices
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let devices = [];

        this.props.devices.forEach( device => {
            devices.push(
                <DeviceListElement deviceName={device.name} deviceId={device.id} onConnect={this.onConnect} />
            );
        });
        
        if (this.state.deviceList.length != devices.length) {
            this.setState({
                deviceList: devices
            });
        }
    }

    onConnect(e, name) {
        if (!this.props.isBrowser) {
            //On mobile device
            bleMod.connect(e.target.id, this.onConnectSuccess, this.onConnectError);
        } else {
            //On browser for testing
            this.props.setConnectedDevice({name: name, id: e.target.id});
            this.props.setConnectionStatus(true);
            document.querySelector(".device-list").style.display = 'none';
            document.querySelector(".file-chooser-container").style.display = 'block';
        }
    }

    onConnectSuccess(result) {
        this.props.setConnectedDevice({name: result.name, id: result.address});
        this.props.setConnectionStatus(true);
        document.querySelector(".device-list").style.display = 'none';
        document.querySelector(".file-chooser-container").style.display = 'block';
    }

    onConnectError(error) {
        alert(`${error.address}: ${error.message}`);
        document.querySelector(".update-buttons-container").style.display = 'none';
    }
    
    render () {
        return (
            <div className="device-list">
                {this.state.deviceList}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceList);