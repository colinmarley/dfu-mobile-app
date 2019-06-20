import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setInitFileUri, setFirmwareFileUri,
    setInitFileName, setFirmwareFileName
} from '../../actions/index';

import FileChooser from '../presentational/FileChooser';

const mapStateToProps = (state, ownProps) => ({
    isBrowser: state.device.isBrowser,

    initFileName: state.dfu.initFileName,
    firmwareFileName: state.dfu.firmwareFileName,
    initFileUri: state.dfu.initFileUri,
    firmwareFileUri: state.dfu.firmwareFileUri
});

const mapDispatchToProps = dispatch => ({
    setInitFileUri: initFileUri => { dispatch(setInitFileUri(initFileUri)); },
    setFirmwareFileUri: firmwareFileUri => { dispatch(setFirmwareFileUri(firmwareFileUri)); },
    setInitFileName: fileName => { dispatch(setInitFileName(fileName)); },
    setFirmwareFileName: fileName => { dispatch(setFirmwareFileName(fileName)); }
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
        if (!this.props.isBrowser) {
            fileChooser.open(this.onChooseInitSuccess, this.onChooseInitError);
        }
    }

    onChooseInitSuccess(file) {
        console.log("choose initFile success");
        console.log(file);
        this.props.setInitFileName(file.name);
        this.props.setInitFileUri(file.uri);
    }

    onChooseInitError(err) {
        console.log("choose initFile Error");
        console.log(err);
        alert(`onChooseInitError: ${err}`);
    }

    chooseFirmware(e) {
        console.log("in chooseFirmware");
        if(!this.props.isBrowser) {
            fileChooser.open(this.onChooseFirmwareSuccess, this.onChooseFirmwareError);
        }
    }

    onChooseFirmwareSuccess(file) {
        console.log("Choose firmwareFile Sucess");
        console.log(file);
        this.props.setFirmwareFileName(file.name);
        this.props.setFirmwareFileUri(file.uri);
    }

    onChooseFirmwareError(err) {
        console.log("Choose firmware Error");
        console.log(err);
        alert(`onChooseFirmwareError: ${err}`);
    }


    render() {
        return (
            <div className="file-chooser-container">
                <FileChooser
                    btnTitle={"Choose Init File (.zip)"}
                    fileName={`Init File Name: ${(this.props.initFileName == "") ? "No File Selected" : this.props.initFileName}`}
                    filePath={`Init File Path: ${(this.props.initFileUri == "") ? "No File Selected" : this.props.initFileUri}`}
                    btnClassName={'file-chooser-btn-init'}
                    pNameClassName={'file-name-init'}
                    pUriClassName={'file-uri-init'}
                    divClassName={'file-chooser-init'}
                    onClick={ this.chooseInit } />
                <FileChooser
                    btnTitle={"Choose Firmware File (.zip)"}
                    fileName={`Firmware File Name: ${(this.props.firmwareFileName == "") ? "No File Selected" : this.props.firmwareFileName}`}
                    filePath={`Firmware File Path: ${(this.props.firmwareFileUri == "") ? "No File Selected" : this.props.firmwareFileUri}`}
                    btnClassName={'file-chooser-btn-firmware'}
                    pNameClassName={'file-name-firmware'}
                    pUriClassName={'file-uri-firmware'}
                    divClassName={'file-chooser-firmware'}
                    onClick={ this.chooseFirmware } />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileChooserContainer);