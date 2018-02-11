import React from 'react';
import TableRows from '../containers/TableRows';
import HrefTo from '../containers/HrefTo';

class AdminTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}
		this.deleteUser = this.deleteUser.bind(this);
	}
	componentDidMount() {
		this.loadData();
	};
	loadData() {
		fetch('http://localhost:3000/api/users')
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json(); 
			})
			.then(data => {
				console.log(data);
				this.setState({
					users: data.users
				})
			})
			.catch(err => {
				console.warn(`Error ${err}`)
			})
	}
	deleteUser(id) {
		fetch(`http://localhost:3000/api/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				} else {
					this.loadData();
				}
			})
			.catch(err => {
				console.warn(`Error ${err}`)
			})
	}
	render() {
		const Rows = this.state.users.map(user => <TableRows key={user._id} user={user} deleteUser={this.deleteUser} />)
		return (
			<div className="container">	
				<table className="table">
					<thead className="thead">
						<tr>
							<td>Id</td>
							<td>User</td>
							<td>Password</td>
							<td>Email</td>
							<td>Profile</td>
							<td>Destroy</td>
						</tr>
					</thead>
					<tbody className="tbody">
						{Rows}
					</tbody>
				</table>
				<HrefTo title="Create new user" link="/create" />
			</div>
		)
	}
}

export default AdminTable;