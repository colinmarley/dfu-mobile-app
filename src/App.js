import React, { Component } from 'react';
import { bleMod } from './js/libs/ble/bleMod';
import { connect } from 'react-redux';

import { setBrowser } from './js/actions/index';

import ScanButtonContainer from './js/components/containers/ScanButtonContainer';
import ConnectionHeaderContainer from './js/components/containers/ConnectionHeaderContainer';
import FileChooserContainer from './js/components/containers/FileChooserContainer';
import StartDfuContainer from './js/components/containers/StartDfuContainer';

//Must name the state browser different from browser passed to props to differentiate
const mapStateToProps = (state, ownProps) => ({
  stateBrowser: state.device.isBrowser
});

const mapDispatchToProps = dispatch => ({
  setBrowser: browser => { dispatch(setBrowser(browser)); }
});



class App extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
      if (!this.props.browser) {

        bleMod.initialize(
            {
                "request": true,
                "statusReceiver": false,
                "restoreKey": "dfuTestApp"
            }
        );
      }
      this.props.setBrowser(this.props.browser);
    }

    

    render() {
        return (
            <div className="app-container">
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