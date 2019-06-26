import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setConnectedDevice, setConnectionStatus } from '../../actions/index';

import { bleMod } from '../../libs/ble/bleDfu';


import DeviceListElement from '../presentational/DeviceListElement';

const mapStateToProps = (state, ownProps) => ({
    isBrowser: state.device.isBrowser,
    dfuStart: state.dfu.dfuStart
});

const mapDispatchToProps = dispatch => ({
    setConnectedDevice:  device => { dispatch(setConnectedDevice(device)); },
    setConnectionStatus:  isConnected => { dispatch(setConnectionStatus(isConnected)); }
});

class DeviceListContainer extends Component {
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
            this.onConnectSuccess({name: name, id: e.target.id});
        }
    }

    onConnectSuccess(result) {
        this.props.setConnectedDevice({name: (!result.name) ? "No Name" : result.name, id: result.id});
        this.props.setConnectionStatus(true);
        document.querySelector(".device-list").style.display = 'none';
        document.querySelector(".rescan-btn-div").style.display = 'none';
        document.querySelector(".file-chooser-container").style.display = 'block';
    }

    onConnectError(error) {
        //TODO: Add case where device disconnects after dfu begins to handle differently
        this.props.setConnectionStatus(false);
        this.props.setConnectedDevice({name: "", id: ""});
        console.log("this.props.dfuStart: ", this.props.dfuStart);
        if(!this.props.dfuStart) {
            console.log('onConnectError: ', error);
            alert(`${error.id}: ${error.errorMessage}`);
            document.querySelector(".scan-btn-div").style.display = "block";
            document.querySelector(".file-chooser-container").style.display = 'none';
            document.querySelector(".rescan-btn").style.display = "block";
        } else {
            alert("DFU has completed. The device has now disconnected");
            document.querySelector(".dfu-finish-btn").style.display = "block";
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
)(DeviceListContainer);