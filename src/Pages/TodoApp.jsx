import React from 'react';
import Toolbar from '../Components/Toolbar';
import TodoItem from '../Components/TodoItem';
import http from '../Helper/http';
import { useState, useEffect } from 'react';
import FloatIcon from '../Components/FloatIcon';
import Popup from '../Components/Popup';

const TodoApp = () => {
	const initUser = {
		name: '',
		email: '',
		gender: '',
		status: '',
	};
	const [user, setUser] = useState(initUser);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);

	const handleInput = (e) => {
		let { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};
	const handleStatus = async (item) => {
		const StatusToBool = item.status === 'Active' ? true : false;
		const newStatus = StatusToBool ? false : true;
		const updatedUser = {
			name: item.name,
			email: item.email,
			gender: item.gender,
			status: newStatus ? 'Active' : 'Inactive',
		};
		try {
			await http.put(`users/${item.id}`, updatedUser);
		} catch (error) {}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await http.post('users', user);
			console.log(data);
			if (data.code === 201) {
				setLoading(true);
				alert('User added successfully ');
				setShowForm(false);
				console.log(data);
			}
		} catch (error) {}
	};
	const fetchData = async () => {
		try {
			const { data } = await http.get('users?page=94');
			if (data.code === 200) {
				setLoading(false);
				setUsers(data.data);
			}
		} catch (error) {}
	};
	useEffect(() => {
		fetchData();
	}, [loading]);
	return loading ? (
		<div className="loader">
			<span className="mdi-spin mdi mdi-loading"></span>
		</div>
	) : (
		<div className="todo-layout">
			<Toolbar title="All Users"></Toolbar>
			<div className="todo-container">
				{users.reverse().map((item, key) => (
					<TodoItem
						handleClick={() => {
							handleStatus(item);
						}}
						data={item}
						status={item.status}
						key={key}
						name={item.name}
					></TodoItem>
				))}
			</div>
			<FloatIcon
				onClick={() => {
					setShowForm(true);
				}}
			></FloatIcon>

			<Popup title="Add User" visible={showForm} onClose={() => setShowForm(false)}>
				<form className="add-form" onSubmit={handleSubmit} action="">
					<div className="mb-3">
						<label htmlFor="">Name</label>
						<input onChange={handleInput} name="name" value={user.name} className="form-control"></input>
					</div>
					<div className="mb-2">
						<label htmlFor="">email</label>
						<input onChange={handleInput} name="email" value={user.email} className="form-control"></input>
					</div>
					<div className="mb-2">
						<label className="d-block" htmlFor="">
							Gender
						</label>
						<div className="form-check form-check-inline">
							<input
								onChange={handleInput}
								className="form-check-input"
								type="radio"
								name="gender"
								value="Male"
							/>
							<label className="form-check-label">Male</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								onChange={handleInput}
								className="form-check-input"
								type="radio"
								name="gender"
								value="Female"
							/>
							<label className="form-check-label">Female</label>
						</div>
					</div>
					<div className="mb-2">
						<label className="d-block" htmlFor="">
							Status
						</label>
						<div className="form-check form-check-inline">
							<input
								onChange={handleInput}
								className="form-check-input"
								type="radio"
								name="status"
								value="Active"
							/>
							<label className="form-check-label">Active</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								onChange={handleInput}
								className="form-check-input"
								type="radio"
								name="status"
								value="Inactive"
							/>
							<label className="form-check-label">Inactive</label>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">
						Add User
					</button>
				</form>
			</Popup>
		</div>
	);
};
export default TodoApp;
