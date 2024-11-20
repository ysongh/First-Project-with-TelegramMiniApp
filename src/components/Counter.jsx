import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-center text-2xl text-green-500'>
        Counter
      </h1>
      <button className='bg-teal-400 p-2 rounded-md px-5 my-3' onClick={() => setCount(count + 1)}>
        Add
      </button>
      <p className='text-3xl text-green-500'>{count}</p>
    </div>
  )
}

export default Counter;