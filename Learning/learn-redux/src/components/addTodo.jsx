import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddTodo() {
    const [input, setInput] = React.useState('');
    const dispatch = useDispatch()

    function SubmitInput(e) {
        e.preventDefault();
        dispatch(addTodo(input))
        setInput('')
    }
    
    return (
        <div>
            <form onSubmit={SubmitInput}>
                <input 
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}