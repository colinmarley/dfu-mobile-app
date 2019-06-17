import React, { Component } from 'react';
import { bleMod } from '../../libs/ble/bleMod';
import { connect } from 'react-redux';
import { addDevice } from '../../actions/index';

import ScanButton from '../presentational/ScanButton';
import DeviceList from './DeviceList';

const mapStateToProps = (state, ownProps) => ({
    isBrowser: state.device.isBrowser,
    devices: state.ble.devices
});

const mapDispatchToProps = dispatch => ({
    addDevice: device => { dispatch(addDevice(device)); }
});

class ScanButtonContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: []
        }

        this.scanForDevices = this.scanForDevices.bind(this);
        this.onScanResult = this.onScanResult.bind(this);
    }

    scanForDevices() {
        document.querySelector(".device-list").style.display = 'block';
        document.querySelector(".scan-btn-div").style.display = "none";
        if (!this.props.isBrowser) {
            bleMod.startScan(this.onScanResult);
            setTimeout(() => {
                bleMod.stopScan(() => {console.log("ScanStopped");});
            }, 4000);
        } else {
            for (var i = 1; i < 10; i ++) {
                this.props.addDevice({
                    name: `Device ${i}`,
                    id: `${i}`
                });
            }
        }
    }

    onScanResult(result) {
        if (result.status == 'scanResult') {
            var match = false;

            for ( var i = 0 ; i < this.props.devices.length; i ++ ) {
                if ( result.address == this.props.devices[i].id ) { match = true; }
            }

            if (!match) {
                this.props.addDevice({ name: (result.name == null) ? "No Name" : result.name, id: result.address });
            }
        }
    }

    render() {
        return (
            <div className="scan-btn-container">
                <ScanButton onClick={this.scanForDevices} /> 
                <DeviceList devices={this.props.devices} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScanButtonContainer);