import { createSignal } from "solid-js";

export default function Layout() {
  const [getCount, setCount] = createSignal(1);
  const addCount = () => {
    setCount(getCount() + 1);
  };

  return <>
    <h1>Hello, world{"!".repeat(getCount())}</h1>
    <button onClick={addCount}>+1</button>
  </>;
}
