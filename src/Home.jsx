import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === id ? { ...todo, completed: !todo.completed } : todo
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                setTodos(prevTodos =>
                    prevTodos.filter(todo => todo._id !== id)
                );
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h2 className="title">Todo List</h2>
            <Create />
            {todos.length === 0 ? (
                <div>
                    <h2>No record</h2>
                </div>
            ) : (
                todos.map(todo => (
                    <div key={todo._id} className="tasksorder">
                        <div className="records">
                            <input
                                type='checkbox'
                                className='checkbox'
                                checked={todo.completed}
                                onChange={() => handleEdit(todo._id)}
                                />
                           
                        <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        className="todo-text"
      >
         
        {todo.task}
      </span>
                            <FaTrash className='delicon' onClick={() => handleDelete(todo._id)} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
