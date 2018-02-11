import React from 'react';
import HrefTo from './HrefTo';
import { Link } from 'react-router-dom';

const TableRows = (props) => {
	function onDeleteClick(e) {
		e.preventDefault();
		props.deleteUser(props.user._id);
	};
	return (
		<tr>
			<td>{props.user._id.substr(0, 6)}</td>
			<td>{props.user.user}</td>
			<td>{props.user.password}</td>
			<td>{props.user.email}</td>
			<td><HrefTo link={`/users/${props.user._id}`} title="edit profile" /></td>
			<td><a href='' onClick={onDeleteClick}><i className="fas fa-trash-alt fa-lg" style={{color: '#FC335C'}}></i></a></td>
		</tr>
	)
};

export default TableRows;