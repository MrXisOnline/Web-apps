import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    function deleteTask(id) {
        dispatch(removeTodo(id))
    }
  return (
    <div>
        <ul>
            {todos.length > 0 ? todos.map((v) => <li key={v.id}>{v.text} <button onClick={() => dispatch(removeTodo(v.id))}>X</button></li>) : "None"}
        </ul>
    </div>
  )
}

export default Todos