import React from 'react';
const FloatIcon = ({onClick}) => {
	return (
		<div className="todo-float-icon-container">
			<a onClick={(e)=>{e.preventDefault(); onClick()}} className="todo-float-icon" href="#">
				<span className="mdi mdi-plus"></span>
			</a>
		</div>
	);
};
export default FloatIcon;
