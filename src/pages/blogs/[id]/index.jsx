import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";

const Page = () => {
  const params = useParams();
  const getId = () => params.id;

  return <>
    <Title>{`${getId()} / NICKYZJ`}</Title>

    <h1>Hello, blog {getId()}</h1>
  </>;
};

export default Page;