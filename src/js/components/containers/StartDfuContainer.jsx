import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bleMod } from '../../libs/ble/bleDfu';

import { setDfuStart, setDfuProgress, setDfuReady, setDfuStatus } from '../../actions/index';

import StartDfuButton from '../presentational/StartDfuButton';
import ProgressBar from '../presentational/ProgressBar';

const mapStateToProps = (state, ownProps) => ({
    isBrowser: state.device.isBrowser,

    dfuReady: state.dfu.dfuReady,
    dfuStart: state.dfu.dfuStart,
    dfuProgress: state.dfu.dfuProgress,
    dfuStatus: state.dfu.dfuStatus,

    fileUri: state.dfu.fileUri,
    connectedDevice: state.ble.connectedDevice,
});

const mapDispatchToProps = dispatch => ({
    setDfuStart: dfuStart => { dispatch(setDfuStart(dfuStart)); },
    setDfuReady: dfuReady => { dispatch(setDfuReady(dfuReady)); },
    setDfuProgress: dfuProgress => { dispatch(setDfuProgress(dfuProgress)); },
    setDfuStatus: dfuStatus => { dispatch(setDfuStatus(dfuStatus)); }
});

class StartDfuContainer extends Component {
    constructor(props) {
        super(props);

        this.sendDfu = this.sendDfu.bind(this);
        this.onSendDfuProgress = this.onSendDfuProgress.bind(this);
        this.onSendDfuError = this.onSendDfuError.bind(this);
        this.onDone = this.onDone.bind(this);
    }

    sendDfu(e) {
        console.log("sendDfu");
        document.querySelector(".progress-bar-div").style.display = "block";
        bleMod.dfu(this.props.connectedDevice.id, this.props.fileUri, this.onSendDfuProgress, this.onSendDfuError);
    }

    onSendDfuProgress(result) {
        switch(result.status) {
            case "deviceConnecting":
                this.props.setDfuStatus("Device Connecting");
                break;
            case "deviceConnected":
                this.props.setDfuStatus("Device Connected");
                break;
            case "enablingDfuMode":
                break;
            case "dfuProcessStarting":
                this.props.setDfuStatus("DFU Starting");
                break;
            case "dfuProcessStarted":
                this.props.setDfuStart(true);
                break;
            case "frimwareUploading":
                this.props.setDfuStatus("Firmware Uploading");
                break;
            case "progressChanged":
                this.props.setDfuProgress(result.progress.percent);
                this.props.setDfuStatus(`Firmware Uploading: ${result.progress.percent}`);
                break;
            case "firmwareValidating":
                this.props.setDfuStatus("Firmware Validating");
                break;
            case "deviceDisconnecting":
                break;
            case "deviceDisconnected":
                this.props.setDfuStatus("Device Disconnected");
                //Last Callback of a successful upgrade
                break;
            case "dfuCompleted":
                this.props.setDfuStatus("DFU Complete: Device Disconnected");
                break;
            case "dfuAborted":
                this.props.setDfuStatus("DFU Aborted by User");
                //Last Callback on user abort
                break;
            default:
                console.log(`Unknown DFU Status: ${result.status}`);
                break;
        }
    }

    onSendDfuError(error) {
        console.log("onSendDfuError");
        console.log(error);
        this.props.setDfuStatus(`DFU Error: ${error.errorMessage}`);
        document.querySelector(".dfu-finish-btn").style.display = "block";
    }

    onDone(e) {
        document.querySelector(".file-chooser-container").style.display = 'none';
        document.querySelector(".start-dfu-container").style.display = "none";
        document.querySelector(".progress-bar-div").style.display = "none";
        document.querySelector(".dfu-finish-btn").style.display = "none";
        document.querySelector(".scan-btn-div").style.display = "block";
        document.querySelector(".rescan-btn").style.display = "block";
        this.props.setDfuProgress(0);
        this.props.setDfuReady(false);
        this.props.setDfuStart(false);
        this.props.setDfuStatus("");
    }

    render() {
        return (
            <div className="start-dfu-container">
                <StartDfuButton btnTitle={ 'Start DFU' } onClick={ this.sendDfu } />
                <ProgressBar
                    progress={ this.props.dfuProgress }
                    onDone={ this.onDone }
                    status={ this.props.dfuStatus }
                /> 
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartDfuContainer);