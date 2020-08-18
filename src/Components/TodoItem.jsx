import React, { useState } from 'react';
import { useEffect } from 'react';
import http from '../Helper/http';
const TodoItem = ({ name,status,data,handleClick }) => {
    const [active,setActive]= useState();
    const [newStatus,setNewStatus]= useState();
    const handleCheck =()=>{
        setActive(prev=>!prev)
        handleClick()
    }
    useEffect(()=>{
    status === 'Active' ? setActive(true) : setActive(false)
    },[])
    useEffect(()=>{

    },[])
	return (
       
		<div className={`todo-item ${active && 'is-completed'}`}>
			<div className="todo-content">
				<h3>{name} </h3>
			</div>
         
			<div onClick={handleCheck} className="todo-icon">
				<span className="mdi mdi-check"></span>
			</div>
		</div>
	);
};


export default TodoItem;
