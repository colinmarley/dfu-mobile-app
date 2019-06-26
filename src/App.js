import React, { Component } from 'react';
import { bleMod } from './js/libs/ble/bleDfu';
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
      this.props.setBrowser(this.props.browser);

      if(!this.props.browser) {
        window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, function(fs) { console.log(fs); }, function(err) {
          console.log(error);
        });
      }
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