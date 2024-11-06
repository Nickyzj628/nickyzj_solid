import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";

const Page = () => {
  const [getCount, setCount] = createSignal(1);
  const addCount = () => {
    setCount(getCount() + 1);
  };

  return <>
    <Title>NICKYZJ</Title>

    <h1>Hello, home{"!".repeat(getCount())}</h1>
    <button onClick={addCount}>+1</button>
  </>;
};

export default Page;