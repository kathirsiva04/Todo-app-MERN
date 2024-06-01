import React, { useState } from 'react';
import axios from 'axios';
import './create.css';

function Create() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task: task })
            .then(result => {
                setTasks([...tasks, result.data]); // Add the new task to the list of tasks
                setTask(''); // Clear the input field
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="text1">
                <input 
                    type='text' 
                    placeholder='       Enter task' 
                    onChange={(e) => setTask(e.target.value)} 
                    value={task} 
                />
            </div>
            <button className="submit" onClick={handleAdd}>Add</button>
            <div className="task-list">
                {tasks.map((t, index) => (
                    <div key={index} className="task-item">
                        {t.task}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Create;
