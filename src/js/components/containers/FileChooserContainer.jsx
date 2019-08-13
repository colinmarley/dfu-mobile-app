import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFileUri, setFileName } from '../../actions/index';

import FileChooser from '../presentational/FileChooser';

const mapStateToProps = (state, ownProps) => ({
	isBrowser: state.device.isBrowser,
	hasFSAccess: state.device.hasFSAccess,

	dfuReady: state.dfu.dfuReady,
	dfuProgress: state.dfu.dfuProgress,

	fileName: state.dfu.fileName,
	fileUri: state.dfu.fileUri,
});

const mapDispatchToProps = dispatch => ({
	setFileUri: fileUri => {
		dispatch(setFileUri(fileUri));
	},
	setFileName: fileName => {
		dispatch(setFileName(fileName));
	},
});

class FileChooserContainer extends Component {
	chooseFile = e => {
		if (this.props.hasFSAccess) {
			// fileChooser.open(this.onChooseFileSuccess, this.onChooseFileError);
			chooser
				.getFile()
				.then(data => this.onChooseFileSuccess(data))
				.catch(err => this.onChooseFileError(err));
		} else {
			this.onChooseFileSuccess({
				name: 'TestName.zip',
				uri: 'a/b/c/c/s/TestName.zip',
			});
		}
	};

	onChooseFileSuccess = data => {
		this.props.setFileName(data.name);
		this.props.setFileUri(data.uri);
		document.querySelector('.start-dfu-container').style.display = 'block';
	};

	onChooseFileError = err => {
		console.log('chooseFile Error');
		console.log(err);
		alert(`onChooseFileError: ${err}`);
	};

	render() {
		return (
			<div className='file-chooser-container'>
				<FileChooser
					btnTitle={'Choose Init File (.zip)'}
					fileName={`File Name: ${
						this.props.fileName == '' ? 'No File Selected' : this.props.fileName
					}`}
					filePath={`File Path: ${
						this.props.fileUri == '' ? 'No File Selected' : this.props.fileUri
					}`}
					btnClassName={'file-chooser-btn-init'}
					pNameClassName={'file-name-init'}
					pUriClassName={'file-uri-init'}
					divClassName={'file-chooser-init'}
					onClick={this.chooseFile}
				/>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FileChooserContainer);
