import { useState } from 'react';
import { Trash2, Edit, CheckCircle } from 'lucide-react';

function CollaborativeTodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        assignedTo: telegramWebApp?.initDataUnsafe?.user?.username || 'Anonymous'
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Collaborative Todo List</h1>
      
      <div className="flex mb-4">
        <input 
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo item"
          className="flex-grow mr-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
    </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div 
            key={todo.id} 
            className={`flex items-center p-2 border rounded-md ${todo.completed ? 'bg-gray-100 line-through' : ''}`}
          >
            <CheckCircle 
              onClick={() => toggleTodo(todo.id)}
              className={`mr-2 cursor-pointer ${todo.completed ? 'text-green-500' : 'text-gray-300'}`}
            />
            <div className="flex-grow">
              <div className="text-sm">{todo.text}</div>
              <div className="text-xs text-gray-500">
                Added by: {todo.assignedTo}
              </div>
            </div>
            <div className="flex space-x-2">
              <Edit 
                className="text-blue-500 cursor-pointer" 
                onClick={() => startEditing(todo)}
              />
              <Trash2 
                className="text-red-500 cursor-pointer" 
                onClick={() => deleteTodo(todo.id)}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Total todos: {todos.length} | 
        Completed: {todos.filter(todo => todo.completed).length}
      </div>
    </div>
  )
}

export default CollaborativeTodoList;