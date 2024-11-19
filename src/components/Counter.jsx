import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button className='bg-blue-300 p-2 rounded-md' onClick={() => setCount(count + 1)}>
        Add
      </button>
      <p>{count}</p>
    </div>
  )
}

export default Counter;