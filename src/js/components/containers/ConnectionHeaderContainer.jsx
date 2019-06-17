import React, { Component } from 'react';
import { connect } from 'react-redux';


import ConnectionHeader from '../presentational/ConnectionHeader';


const mapStateToProps = (state, ownProps) => ({
    isConnected: state.ble.isConnected,
    connectedDevice: state.ble.connectedDevice,

    isBrowser: state.device.isBrowser
});

const mapDispatchToProps = dispatch => ({

});

class ConnectionHeaderContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="conn-header-div">
                <ConnectionHeader status={ this.props.isConnected } browser={ this.props.isBrowser } name={ this.props.connectedDevice.name } id={ this.props.connectedDevice.id } />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionHeaderContainer);