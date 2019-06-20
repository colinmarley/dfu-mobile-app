import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInitFileUri, setFirmwareFileUri } from '../../actions/index';

import FileChooser from '../presentational/FileChooser';

const mapStateToProps = (state, ownProps) => ({
    isBrowser: state.device.isBrowser,

    initFileName: state.dfu.initFileName,
    firmwareFileName: state.dfu.firmwareFileName,
    initUri: state.dfu.initUri,
    firmwareUri: state.dfu.firmwareUri
});

const mapDispatchToProps = dispatch => ({
    setInitFileUri: initUri => { dispatchEvent(setInitFileUri(initUri)); },
    setFirmwareFileUri: firmwareUri => { dispatchEvent(setFirmwareFileUri(firmwareUri)); }
});

class FileChooserContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.chooseInit = this.chooseInit.bind(this);
        this.onChooseInitSuccess = this.onChooseInitSuccess.bind(this);
        this.onChooseInitError = this.onChooseInitError.bind(this);
        this.chooseFirmware = this.chooseFirmware.bind(this);
        this.onChooseFirmwareSuccess = this.onChooseFirmwareSuccess.bind(this);
        this.onChooseFirmwareError = this.onChooseFirmwareError.bind(this);
    }

    chooseInit(e) {
        console.log("in chooseInit");
        fileChooser.open(this.onChooseInitSuccess, this.onChooseInitError);
    }

    onChooseInitSuccess(file) {
        console.log("choose initFile success");
        console.log(file);
    }

    onChooseInitError(err) {
        console.log("choose initFile Error");
        console.log(err);
    }

    chooseFirmware(e) {
        console.log("in chooseFirmware");
        fileChooser.open(this.onChooseFirmwareSuccess, this.onChooseFirmwareError);
    }

    onChooseFirmwareSuccess(file) {
        console.log("Choose firmwareFile Sucess");
        console.log(file);
    }

    onChooseFirmwareError(err) {
        console.log("Choose firmware Error");
        console.log(err);
    }


    render() {
        return (
            <div className="file-chooser-container">
                <FileChooser
                    btnTitle={"Choose Init File (.zip)"}
                    fileName={this.props.initFileName}
                    btnClassName={'file-chooser-btn-init'}
                    pClassName={'file-name-init'}
                    onClick={ this.chooseInit } />
                <FileChooser
                    btnTitle={"Choose Firmware File (.zip)"}
                    fileName={this.props.firmwareFileName}
                    btnClassName={'file-chooser-btn-firmware'}
                    pClassName={'file-name-firmware'}
                    onClick={ this.chooseFirmware } />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileChooserContainer);