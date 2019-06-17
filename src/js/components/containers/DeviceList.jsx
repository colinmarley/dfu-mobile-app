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

    onConnect(e) {
        if (!this.props.isBrowser) {
            bleMod.connect(e.target.id, this.onConnectSuccess);
        }
    }

    onConnectSuccess(result) {
        console.log("successfully Connected");
        console.log(result.name);

        this.props.setConnectedDevice({name: result.name, id: result.address});
        this.props.setConnectionStatus(true);

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