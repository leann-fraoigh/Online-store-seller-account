import { useState } from 'react';

function Main() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Main page</p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default Main;
