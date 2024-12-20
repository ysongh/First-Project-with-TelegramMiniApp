import { useEffect, useState } from 'react';
import { Trash2, Edit, Clock, CheckCircle } from 'lucide-react';

function CollaborativeTodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!window.Telegram?.WebApp) {
      setError('Telegram WebApp is not properly initialized');
      return;
    }

    const webapp = window.Telegram.WebApp;

    // Initialize the app
    try {
      webapp.ready();
      webapp.expand();

      // Get user data
      const initData = webapp.initDataUnsafe;
      if (initData.user) {
        setUserInfo({
          username: initData.user.username,
        });
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        assignedTo: userInfo?.username || 'Anonymous'
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setNewTodo(todo.text);
  };

  const saveEditedTodo = () => {
    const updatedTodos = todos.map(todo => 
      todo.id === editingId ? { ...todo, text: newTodo } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Collaborative Todo List</h1>
      
      <div className="flex mb-4">
        <input 
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo item"
          className="flex-grow mr-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {editingId ? (
          <button 
            onClick={saveEditedTodo} 
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button 
            onClick={addTodo} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        )}
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
              <div className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" />
                {new Date(todo.id).toLocaleString()}
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