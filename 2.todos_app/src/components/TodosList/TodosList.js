import React from "react";

const TodosList = (props) => {
    const { todos } = props;
    if (!todos || todos.length === 0) return <p>No todos, sorry </p>;
    return (<ul > {" "} {
        todos.map((todo) => {
            return <li key={todo.id} > {todo.title} </li>;
        })
    } {" "} </ul>
    );
};

export default TodosList;