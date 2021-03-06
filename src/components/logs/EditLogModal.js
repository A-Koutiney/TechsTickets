import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TechSelectOptions from '../techs/TechSelectOptions';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';

import M from 'materialize-css/dist/js/materialize.min.js';
const EditLogModal = ({ current, updateLog }) => {
	const [message, setMessage] = useState('');
	const [attention, setAttention] = useState(false);
	const [tech, setTech] = useState('');

	useEffect(() => {
		if (current) {
			setMessage(current.message);
			setAttention(current.attention);
			setTech(current.tech);
		}
	}, [current]);
	const onsubmit = () => {
		if (message === '' || tech === '') {
			M.toast({
				html: 'Tech name and message are required',
				classes: 'red lighten-1',
			});
		} else {
			console.log(message, tech, attention);
			const updLog = {
				id: current.id,
				message,
				attention,
				tech,
				date: new Date(),
			};
			updateLog(updLog);
			M.toast({
				html: `Log updated by ${tech}`,
				classes: 'green lighten-1',
			});

			// Clear Fields
			setMessage('');
			setTech('');
			setAttention(false);
		}
	};
	return (
		<div id='edit-log-modal' className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>Edit System Log</h4>
				<div className='row'>
					<div className='input-field'>
						<input
							type='text'
							name='message'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='input-field'>
						<select
							name='tech'
							value={tech}
							className='browser-default'
							onChange={(e) => setTech(e.target.value)}
						>
							<option value='' disabled>
								Select Technician
							</option>
							<TechSelectOptions />
						</select>
					</div>
				</div>
				<div className='row'>
					<div className='input-field'>
						<p>
							<label>
								<input
									type='checkbox'
									className='filled-in'
									checked={attention}
									value={attention}
									onChange={(e) => setAttention(!attention)}
								/>
								<span>Needs Attention</span>
							</label>
						</p>
					</div>
				</div>
			</div>
			<div className='modal-footer'>
				<a
					href='#!'
					onClick={onsubmit}
					className='modal-close waves-effect blue btn'
				>
					Update
				</a>
			</div>
		</div>
	);
};
EditLogModal.propTypes = {
	current: PropTypes.object,
};

const modalStyle = {
	width: '75%',
	height: '75%',
};
const mapStateToProps = (state) => ({
	current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
