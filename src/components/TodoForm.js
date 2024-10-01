// src/components/TodoForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    margin-right: 10px;
`;

const Select = styled.select`
    margin-right: 10px;
    padding: 10px;
`;

const TodoForm = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (inputValue.trim() === '') return; // Prevent empty tasks

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            dueDate,
            priority,
            completed: false,
        };

        addTodo(newTodo); // Call addTodo function passed as a prop
        setInputValue('');
        setDueDate('');
        setPriority('Low');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Add a new task..."
            />
            <Input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
            />
            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </Select>
            <button type="submit">Add</button>
        </Form>
    );
};

export default TodoForm;
