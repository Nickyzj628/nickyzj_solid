import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";

const Page = () => {
  const [getCount, setCount] = createSignal(1);
  const addCount = () => {
    setCount(getCount() + 1);
  };

  return <>
    <Title>NICKYZJ</Title>

    <h1 className="text-3xl font-bold">Hello, home{"!".repeat(getCount())}</h1>
    <button className="h-10 aspect-square justify-center" onClick={addCount}>+1</button>
  </>;
};

export default Page;