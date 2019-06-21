import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bleMod } from '../../libs/ble/bleDfu';

import StartDfuButton from '../presentational/StartDfuButton';

const mapStateToProps = (state, ownProps) => ({
    isBrowser: state.device.isBrowser,

    dfuReady: state.dfu.dfuReady,
    dfuProgress: state.dfu.dfuProgress,

    fileUri: state.dfu.fileUri,
    connectedDevice: state.ble.connectedDevice,
});

const mapDispatchToProps = dispatch => ({

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
        bleMod.dfu(this.props.connectedDevice.id, this.props.fileUri, console.log, this.onSendDfuError);
    }

    onSendDfuProgress(result) {
        console.log("progress");
        switch(result.status) {
            case 'progressChanged':
                console.log("percent: ", result.progress.percent);
                break;
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
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartDfuContainer);