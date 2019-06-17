import React, { Component } from 'react';
import { bleMod } from '../../libs/ble/bleMod.js';
import { connect } from 'react-redux';

import DeviceList from './DeviceList';

const mapStateToProps = (state, ownProps) => ({
    stateBrowser: state.device.isBrowser
});

const mapDispatchToProps = dispatch => ({

});

const TEST_DEVICES = [
    {name: "device 1", id: 1},
    {name: "device 2", id: 2},
    {name: "device 3", id: 3},
    {name: "device 4", id: 4},
    {name: "device 5", id: 5},
    {name: "device 6", id: 6},
    {name: "device 7", id: 7},
    {name: "device 8", id: 8},
]

class DeviceListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceList: [],
        }
    }   

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        return (
            <div className="device-list-container">
                <DeviceList devices={TEST_DEVICES} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceListContainer);