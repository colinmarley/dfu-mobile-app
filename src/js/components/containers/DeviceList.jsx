import React, { Component } from 'react';
import { connect } from 'react-redux';


import DeviceListElement from '../presentational/DeviceListElement';

const mapStateToProps = (state, ownProps) => ({
    stateBrowser: state.device.isBrowser
});

const mapDispatchToProps = dispatch => ({

});

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
                {this.state.deviceList}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceList);