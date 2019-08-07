import React from 'react';

const ConnectionHeader = ({ status, name, id, onDisconnect }) => {
	return (
		<div className='conn-header'>
			<p className='conn-status-label'>Status:</p>
			<p className='conn-status'>{status ? 'Connected' : 'Disconnected'}</p>
			<button
				className='disconnect-btn'
				style={{ display: status ? 'block' : 'none' }}
				onClick={e => onDisconnect(e, id)}
			>
				Disconnect
			</button>
			<p className='conn-device-name-label'>{status ? 'Name:' : ''}</p>
			<p className='conn-device-name'>{status ? name : ''}</p>
			<p className='conn-device-id-label'>{status ? 'Id:' : ''}</p>
			<p className='conn-device-id'>{status ? id : ''}</p>
		</div>
	);
};

export default ConnectionHeader;
