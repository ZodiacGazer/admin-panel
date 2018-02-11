import React from 'react';
import { Link } from 'react-router-dom';

const HrefTo = (props) => (
	<Link className="link" to={props.link}>{props.title}</Link>
);

export default HrefTo;