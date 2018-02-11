import React from 'react';
import HrefTo from './HrefTo';
import { Link } from 'react-router-dom';

class CreateTable extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let form = document.forms.addUser;
		const body = {
			user: form.user.value,
			password: form.password.value,
			email: form.email.value 
		};
		this.props.match.params.id ? this.updateUser(body) : this.createUser(body);
	}
	createUser(user) {
		fetch('http://localhost:3000/api/users', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then(res => {
			if (!res.ok) {
				throw Error(res.statusText)
			}
			return res.json()
		})
		.then(data => { 
			console.warn(data);
			window.location.href = "/"
		})
		.catch(err => {
			console.warn('Err in sending data to server: ' + err.message)
		})
	};
	updateUser(user) {
		fetch(`http://localhost:3000/api/users/${this.props.match.params.id}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then(res => {
			if (!res.ok) {
				throw Error(res.statusText)
			}
			return res.json()
		})
		.then(data => { 
			console.warn(data);
			window.location.href = "/"
		})
		.catch(err => {
			console.warn('Err in sending data to server: ' + err.message)
		})
	}
	render() {
		const editParam = this.props.match.params.id ? <h3>Editing user with id: {this.props.match.params.id}</h3> : <h3>Create new user</h3>;
		return (
			<div className="container">
				<form className="inputForm" name="addUser" onSubmit={this.handleSubmit}>
					{editParam}
					<input type="text" name="user" placeholder="user" />
					<input type="password" name="password" placeholder="password" />
					<input type="text" name="email" placeholder="email" />
					<button className="form__button">Send</button>
				</form>
				<HrefTo title="View all users" link="/" />
			</div>
		)
	}
}

export default CreateTable;