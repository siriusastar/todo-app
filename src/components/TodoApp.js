// src/components/TodoApp.js
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
`;

const FilterContainer = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
`;

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    const updateTodo = (id, updatedTodo) => {
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'Completed') return todo.completed;
        if (filter === 'Pending') return !todo.completed;
        return true; // 'All' filter
    });

    return (
        <Container>
            <Title>To-Do App</Title>
            <FilterContainer>
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
            </FilterContainer>
            <TodoForm addTodo={addTodo} />
            <TodoList 
                todos={filteredTodos} 
                updateTodo={updateTodo} 
                deleteTodo={deleteTodo} 
                toggleComplete={toggleComplete} 
            />
        </Container>
    );
};

export default TodoApp;
