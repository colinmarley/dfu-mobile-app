import React from 'react';

const RescanButton = ({ onClick, isShowing }) => {
	return (
		(isShowing &&
		<div className='rescan-btn-div'>
			<button className='rescan-btn' onClick={e => onClick(e)}>
				Re-Scan
			</button>
		</div>
		)
	);
};

export default RescanButton;
