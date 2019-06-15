import React, { Component } from 'react';
import { bleMod } from './js/libs/ble/bleMod';

import DeviceListContainer from './js/components/containers/DeviceListContainer';
import ScanButtonContainer from './js/components/containers/ScanButtonContainer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          browser: true
        }
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

      this.setState({ browser: this.props.browser });
    }

    render() {
        return (
            <div className="app-container">
                <ScanButtonContainer />
            </div>
        )
    }
}

export default App;