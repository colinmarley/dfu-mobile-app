import React, { Component } from 'react';

import DeviceListElement from '../presentational/DeviceListElement';

class DeviceList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            deviceList: []
        }
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
                <DeviceListElement deviceName={device.name} deviceId={device.id} />
            );
        });
        
        if (this.state.deviceList.length != devices.length) {
            this.setState({
                deviceList: devices
            });
        }
    }
    
    render () {
        return (
            <div className="device-list">
                <DeviceListElement deviceName={"Device Name"} deviceId={'AA:AA:AA:AA:AA:AA'} />
                {this.state.deviceList}
            </div>
        )
    }
}

export default DeviceList;