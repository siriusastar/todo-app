// src/components/TodoItem.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    background-color: ${({ completed }) => (completed ? '#d4edda' : '#f8f9fa')};
    transition: background-color 0.3s, transform 0.2s;
`;

const StatusImage = styled.span`
    margin-right: 10px;
    font-size: 20px; /* Adjust size as needed */
`;

const TodoItem = ({ todo, updateTodo, deleteTodo, toggleComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const handleUpdate = () => {
        updateTodo(todo.id, { ...todo, text: editedText });
        setIsEditing(false);
    };

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={200}
            classNames="fade"
        >
            <Item completed={todo.completed}>
                <StatusImage>
                    {todo.completed ? '✅' : '🌟'} {/* Use emojis for status */}
                </StatusImage>
                {isEditing ? (
                    <>
                        <input 
                            value={editedText} 
                            onChange={(e) => setEditedText(e.target.value)} 
                        />
                        <button onClick={handleUpdate}>Save</button>
                    </>
                ) : (
                    <>
                        <input 
                            type="checkbox" 
                            checked={todo.completed} 
                            onChange={() => toggleComplete(todo.id)} 
                        />
                        <span>{todo.text} - Due: {todo.dueDate} - Priority: {todo.priority}</span>
                        <div>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    </>
                )}
            </Item>
        </CSSTransition>
    );
};

export default TodoItem;
