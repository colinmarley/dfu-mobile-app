import React, { Component } from 'react';
import { bleMod } from '../../libs/ble/bleMod';
import { connect } from 'react-redux';

import { setDfuStatus, setInitStatus, setFirmwareStatus } from '../../actions/index';

import UpdateButtons from '../presentational/UpdateButtons';

const mapStateToProps = (state, ownProps) => ({
    dfuReady: state.dfu.dfuReady,
    initSent: state.dfu.initSent,
    firmwareSent: state.dfu.firmwareSent,

    isConnected: state.ble.isConnected,

    isBrowser: state.device.isBrowser,

    cordova: state.ble.isConnected

});

const mapDispatchToProps = dispatch => ({
    setDfuStatus: dfuReady => { dispatch(setDfuStatus(dfuReady)); },
    setInitStatus: initSent => { dispatch(setInitStatus(initSent)); },
    setFirmwareStatus: firmwareSent => { dispatch(setFirmwareStatus(firmwareSent)); }
});

const dfuStyle = (conds) => {
    console.log("dfuConds: ", conds);
    const ret = {   
        "color": (!conds[0]) ? "lawngreen" : "grey",
        "border-color": (!conds[0]) ? "lawngreen" : "grey"
    }
    console.log("ret: ", ret);
    return (ret);
}

const initStyle = (conds) => {
    console.log("initConds: ", conds);
    const ret = {
        "color": (conds[0] && !conds[1]) ? "lawngreen": "grey",
        "border-color": (conds[0] && !conds[1]) ? "lawngreen": "grey"
    }
    console.log("ret: ", ret);
    return (ret);
}

const firmwareStyle = (conds) => {
    console.log("firmwarConds: ", conds);
    const ret = {
        "color": (conds[0] && conds[1] && !conds[2]) ? "lawngreen" : "grey",
        "border-color": (conds[0] && conds[1] && !conds[2]) ? "lawngreen" : "grey"
    }
    console.log("ret: ", ret);
    return (ret);
}

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
        if (this.props.cordova) {
            this.props.setDfuStatus(true);
            console.log("onDfu");
        }
    }

    onInit(e) {
        if (this.props.cordova && this.props.dfuReady) {
            this.props.setInitStatus(true);
            console.log("onInt");
        }
    }

    onFirmware(e) {
        if(this.props.cordova && this.props.initSent) {
            this.props.setFirmwareStatus(true);
            console.log("onFirmware");
        }
    }

    render() {
        return (
            <div className="update-buttons-container">
                <UpdateButtons
                    onDfu={ this.onDfu }
                    onInit={ this.onInit }
                    onFirmware={ this.onFirmware }
                    dfuReady={ this.props.dfuReady }
                    initSent={ this.props.initSent }
                    firmwareSent={ this.props.firmwareSent }
                    dfuStyle={ dfuStyle([this.props.dfuReady, this.props.initSent, this.props.firmwareSent]) }
                    initStyle={ initStyle([this.props.dfuReady, this.props.initSent, this.props.firmwareSent]) }
                    firmwareStyle={ firmwareStyle([this.props.dfuReady, this.props.initSent, this.props.firmwareSent]) } />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateButtonsContainer);