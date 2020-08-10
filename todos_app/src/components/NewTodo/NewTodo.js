import React, { useState } from "react";

const NewTodo = (props) => {
    const [enteredText, setEnteredText] = useState("");

    const addTodoHandler = (event) => {
        event.preventDefault();

        const newTodo = {
            userId: 1,
            id: (Math.random() * 100).toString(),
            title: enteredText,
            completed: false,
        };

        props.onAddTodo(newTodo);
    };

    const textChangeHandler = (event) => {
        setEnteredText(event.target.value);
    };

    return (<form onSubmit={addTodoHandler}>
        <input type="text"
            value={enteredText}
            onChange={textChangeHandler} />
        <button type="submit" > Add ToDo </button>
    </form>
    );
};

export default NewTodo;