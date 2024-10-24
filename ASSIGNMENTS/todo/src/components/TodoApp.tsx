import { useReducer, useState } from "react";

const todoReducer = (state: any[] , action: { type: any; payload: any; }) => {
    switch(action.type) {
        case 'add' :
            return [...state , { id : Date.now() , text : action.payload , completed : false }];
        case 'toggle' :
            return state.map(todo => 
                todo.id === action.payload ? { ...todo , completed : !todo.completed } : todo
            );
        case 'delete' :
            return state.filter(todo => todo.id !== action.payload);
        default :
            return state;        
    }
}

const TodoApp = () => {
    const [ todos , dispatch ] = useReducer(todoReducer, []);
    const [ todo , setTodo ] = useState('');

    const handleSubmit = (e : any) => {
        e.preventDefault();
        dispatch({ type : 'add', payload : todo });
        setTodo('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex space-x-3 mb-4">
                <input value={todo} onChange={(e) => setTodo(e.target.value)} 
                    className="border border-gray-300 rounded-lg p-2 
                               flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter new Task"/>
                <button 
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2
                               rounded-lg hover:bg-indigo-700 focus:outline-none
                               focus: ring-2 focus: ring-indigo-500">Add</button>
            </form>
            <ul className="space-y-4">
                {todos.map(todo => ( 
                    <li key={todo.id} className="flex justify-between items-start bg-gray-50 rounded-lg shadow-md">
                        <span
                        className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                            {todo.text}
                        </span>
                        <div className="space-x-3">
                            <button onClick={() => dispatch({ type : 'toggle' , payload : todo.id})}
                                className={`px-3 py-1 rounded-lg ${todo.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                                {todo.completed? 'Undo' : 'Complete'}
                            </button>
                            <button onClick={() => dispatch({ type : 'delete' , payload : todo.id})}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg">
                                Delete
                        </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;