import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";

const Page = () => {
  const params = useParams();

  return <>
    <Title>{params.id} / NICKYZJ</Title>
    <h1>Hello, anime {params.id}</h1>
  </>;
};

export default Page;