import React, { Component } from 'react';
import { bleMod } from '../../libs/ble/bleMod';
import { connect } from 'react-redux';

import UpdateButtons from '../presentational/UpdateButtons';

const mapStateToProps = (state, ownProps) => ({
    dfuReady: state.dfu.dfuReady,
    initSent: state.dfu.initSent,
    firmwareSent: state.dfu.firmwareSent
});

const mapDispatchToProps = dispatch => ({
    setDfuStatus: dfuReady => { dispatch(setDfuStatus(dfuReady)); },
    setInitStatus: initSent => { dispatch(setInitStatus(initSent)); },
    setFirmwareStatus: firmwareSent => { dispatch(setFirmwareStatus(firmwareSent)); }
});

class UpdateButtonsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.onDfu = this.onDfu.bind(this);
        this.onInit = this.onInit.bind(this);
        this.onFirmware = this.onFirmware.bind(this);
    }

    onDfu(e) {
        this.props.setDfuStatus(true);
        console.log("onDfu");
    }

    onInit(e) {
        this.props.setInitStatus(true);
        console.log("onInt");
    }

    onFirmware(e) {
        this.setFirmwareStatus(true);
        console.log("onFirmware");
    }

    render() {
        return (
            <div className="update-buttons-container">
                <UpdateButtons onDfu={ this.onDfu } onInit={ this.onInit } onFirmware={ this.onFirmware } />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateButtonsContainer);