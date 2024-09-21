import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const initialState = []
const init = () => { //-Cargamos los todos del localStorage
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
 
    const [todos, dispatch] = useReducer(todoReducer, initialState, init)
    

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    },[todos]);

    //-- action agregar
    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo', 
            payload: todo
        };
        dispatch(action); 
    }
    //-- action borrar
    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo', 
            payload: id
        }; 
        dispatch(action);
    }
    //-- action cambiar done de false a true
    const handleDone = (id) => {
        const action = {
            type: '[TODO] Change Done',
            payload: id
        }
        dispatch(action)
    }


    return {
        todos,
        todosCount: todos.length,
        pendindTodosCount: todos.filter( todo => !todo.done).length,
        handleDeleteTodo,
        handleDone,
        handleNewTodo
    }
}

