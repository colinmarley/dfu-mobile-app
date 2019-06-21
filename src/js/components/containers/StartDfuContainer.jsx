import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bleMod } from '../../libs/ble/bleDfu';

import { setDfuStart, setDfuProgress } from '../../actions/index';

import StartDfuButton from '../presentational/StartDfuButton';
import ProgressBar from '../presentational/ProgressBar';

const mapStateToProps = (state, ownProps) => ({
    isBrowser: state.device.isBrowser,

    dfuReady: state.dfu.dfuReady,
    dfuStart: state.dfu.dfuStart,
    dfuProgress: state.dfu.dfuProgress,

    fileUri: state.dfu.fileUri,
    connectedDevice: state.ble.connectedDevice,
});

const mapDispatchToProps = dispatch => ({
    setDfuStart: dfuStart => { dispatch(setDfuStart(dfuStart)); },
    setDfuProgress: dfuProgress => { dispatch(setDfuProgress(dfuProgress)); }
});

class StartDfuContainer extends Component {
    constructor(props) {
        super(props);

        this.sendDfu = this.sendDfu.bind(this);
        this.onSendDfuProgress = this.onSendDfuProgress.bind(this);
        this.onSendDfuError = this.onSendDfuError.bind(this);
    }

    sendDfu(e) {
        console.log("sendDfu");
        document.querySelector(".progress-bar-div").style.display = "block";
        bleMod.dfu(this.props.connectedDevice.id, this.props.fileUri, this.onSendDfuProgress, this.onSendDfuError);
    }

    onSendDfuProgress(result) {
        console.log("progress");
        switch(result.status) {
            case "progressChanged":
                this.props.setDfuProgress(result.progress.percent);
                break;
            case "dfuCompleted":
                document.querySelector(".start-dfu-container").style.display = 'none';
            default:
                console.log(`dfuProgress: ${result.status}`);
                break;
        }
    }

    onSendDfuError(error) {
        console.log("onSendDfuError");
        console.log(error);
    }

    render() {
        return (
            <div className="start-dfu-container">
                <StartDfuButton btnTitle={ 'Start DFU' } onClick={ this.sendDfu } />
                <ProgressBar progress={ this.props.dfuProgress } /> 
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartDfuContainer);