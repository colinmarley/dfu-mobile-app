import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bleMod } from '../../libs/ble/bleDfu';
import { setConnectedDevice, setConnectionStatus } from '../../actions/index';

import ConnectionHeader from '../presentational/ConnectionHeader';

const mapStateToProps = (state, ownProps) => ({
	isConnected: state.ble.isConnected,
	connectedDevice: state.ble.connectedDevice,

	isBrowser: state.device.isBrowser,
});

const mapDispatchToProps = dispatch => ({
	setConnectedDevice: device => {
		dispatch(setConnectedDevice(device));
	},
	setConnectionStatus: isConnected => {
		dispatch(setConnectionStatus(isConnected));
	},
});

class ConnectionHeaderContainer extends Component {
	onDisconnect = (e, id) => {
		//Disconnect Button Tapped
		if (!this.props.isBrowser) {
			//Try to disconnect if the app is on a device and is already connected
			bleMod.disconnect(id, this.onDisconnectSuccess, this.onDisconnectError);
		} else {
			//Testing
			this.onDisconnectSuccess();
		}
	};

	onDisconnectSuccess = (result = '') => {
		this.props.setConnectionStatus(false);
        this.props.setConnectedDevice({ name: '', id: '' });
        
		document.querySelector('.scan-btn-div').style.display = 'block';
		document.querySelector('.rescan-btn-div').style.display = 'none';
		document.querySelector('.file-chooser-container').style.display = 'none';
		document.querySelector('.start-dfu-container').style.display = 'none';
	};

	onDisconnectError = error => {
		console.log('onDisconnectError');
		console.log(error);
	};

	render() {
		return (
			<div className='conn-header-div'>
				<ConnectionHeader
					onDisconnect={this.onDisconnect}
					status={this.props.isConnected}
					name={this.props.connectedDevice.name}
					id={this.props.connectedDevice.id}
				/>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectionHeaderContainer);
