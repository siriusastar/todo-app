// src/components/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const List = styled.ul`
    padding: 0;
    list-style: none; /* No bullets */
`;

const TodoList = ({ todos, updateTodo, deleteTodo, toggleComplete }) => {
    return (
        <List>
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    updateTodo={updateTodo} 
                    deleteTodo={deleteTodo} 
                    toggleComplete={toggleComplete} 
                />
            ))}
        </List>
    );
};

export default TodoList;
