"use client";

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p data-testid="count">{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
