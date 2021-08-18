import React, { useState, useEffect } from 'react';
import { getTechs } from '../../actions/techActions';
import { connect } from 'react-redux';
import TechItem from './TechItem';

const TechListModal = ({ tech: { techs, loading }, getTechs }) => {
	useEffect(() => {
		getTechs();
		// eslint-disable-next-line
	}, []);
	// const getTechs = async () => {
	// 	setLoading(true);

	// 	const res = await fetch('/techs');
	// 	const data = await res.json();

	// 	setTechs(data);
	// 	setLoading(false);
	// };

	return (
		<div id='tech-list-modal' className='modal'>
			<div className='modal-content'>
				<h4>Technician List</h4>
				<ul className='collection'>
					{!loading &&
						techs !== null &&
						techs.map((tech) => <TechItem tech={tech} key={tech.id} />)}
				</ul>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	tech: state.techs,
});
export default connect(mapStateToProps, { getTechs })(TechListModal);