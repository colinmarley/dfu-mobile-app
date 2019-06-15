import React, { Component } from 'react';
import { bleMod } from '../../libs/ble/bleMod';

import ScanButton from '../presentational/ScanButton';
import DeviceList from './DeviceList';

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
        bleMod.startScan(this.onScanResult);
        setTimeout(() => {
            bleMod.stopScan(() => {console.log("ScanStopped");});
            console.log("this.state.devices: ");
            console.log(this.state.devices);
        }, 4000);
    }

    onScanResult(result) {
        if (result.status == 'scanResult') {
            var match = false;

            for ( var i = 0 ; i < this.state.devices.length; i ++ ) {
                if ( result.address == this.state.devices[i].id ) {
                    
                    match = true;
                }
            }

            if (!match) {
                let oldDevices = this.state.devices;
                oldDevices.push({ name: (result.name == null) ? "No Name" : result.name, id: result.address });
                this.setState({ devices: oldDevices });
            }
        }
    }

    render() {
        return (
            <div className="scan-btn-container">
                <ScanButton onClick={this.scanForDevices} /> 
                <DeviceList devices={this.state.devices} />
            </div>
        );
    }
}

export default ScanButtonContainer;