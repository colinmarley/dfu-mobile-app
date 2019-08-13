import React, { Component } from 'react';
import { bleMod } from './js/libs/ble/bleDfu';
import { connect } from 'react-redux';

import { setBrowser, setFSAccess } from './js/actions/index';

import ScanButtonContainer from './js/components/containers/ScanButtonContainer';
import ConnectionHeaderContainer from './js/components/containers/ConnectionHeaderContainer';
import FileChooserContainer from './js/components/containers/FileChooserContainer';
import StartDfuContainer from './js/components/containers/StartDfuContainer';

//NOTE: Must name the state browser different from browser passed to props to differentiate
const mapStateToProps = (state, ownProps) => ({
	stateBrowser: state.device.isBrowser,
	hasFSAccess: state.device.hasFSAccess,
});

const mapDispatchToProps = dispatch => ({
	setBrowser: browser => {
		dispatch(setBrowser(browser));
	},
	setFSAccess: hasFSAccess => {
		dispatch(setFSAccess(hasFSAccess));
	},
});

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.setBrowser(this.props.browser);

    	//Request Access to the file storage if running on a device
		if (!this.props.browser) {
			window.requestFileSystem(
				window.PERSISTENT,
				5 * 1024 * 1024,
				(fs) => {
					//file system accessed
					console.log('Success');
					console.log(fs);
					this.props.setFSAccess(true);
				},
				(err) => {
					//error while accessing file system
					console.log(err);
					this.props.setFSAccess(false);
				}
			);
		}
	}

	render() {
		return (
			<div className='app-container'>
				<ConnectionHeaderContainer />
				<ScanButtonContainer />
				<FileChooserContainer />
				<StartDfuContainer />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
