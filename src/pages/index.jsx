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
    <hr />
    <h3>{"Ciallo～(∠·ω< )⌒★"}</h3>
    <h5>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ullam repellat commodi error consequatur nesciunt. Vel quasi enim possimus consequuntur officia totam consectetur, praesentium vitae quos asperiores officiis porro doloribus!
      Temporibus quo unde est quam ratione aliquam, id eligendi! Accusamus esse nostrum, ut dolorum inventore, repudiandae corrupti animi molestias porro vel distinctio perferendis non eaque error nam enim sunt odit.
      Explicabo ex assumenda deserunt voluptatum est! Cupiditate quas tempora expedita quidem earum ad officiis perspiciatis? Suscipit delectus possimus tempora distinctio quas, ipsa odit nostrum similique cupiditate cumque, dolore ipsum atque.
      Non ut illum ducimus omnis, quidem aut dolore quasi! Numquam odit ex at non in impedit minima quas eos qui quaerat. Ipsa, deserunt. Expedita earum minus enim pariatur sunt molestiae.
      Cum architecto ut harum maiores a doloremque culpa dicta sequi dignissimos magnam, minus impedit est? Quisquam perferendis eveniet esse neque adipisci aliquam facilis, veniam nisi numquam eum, sequi corporis eos.
      Voluptatum eum hic, commodi, quas ut quis vitae sit maiores eligendi, quasi iusto blanditiis repellat esse dolore pariatur rem quidem. Veritatis numquam earum rerum possimus, consequatur ex incidunt eius dicta!
      Explicabo neque quos est, nulla molestiae maxime aperiam vero! Neque magnam fugiat voluptates blanditiis nemo labore perspiciatis saepe quam enim doloribus. Ad id deserunt illo officiis ducimus cum adipisci. Explicabo?
      Minima laudantium id labore beatae nisi eligendi, recusandae minus earum aut assumenda numquam voluptates tempora soluta quidem veniam perspiciatis similique, sint pariatur ab iusto. Maxime ipsa fugit sapiente praesentium quas.
      Illo modi consequatur odit. Iusto, molestiae ad libero ducimus quisquam aut architecto neque, similique dolores itaque optio cupiditate adipisci recusandae deserunt soluta reprehenderit tenetur, illum perspiciatis! Provident nemo reprehenderit quod.
      Quibusdam ipsam, eveniet distinctio quos at quod cupiditate dolor illum dolore perferendis laborum facilis iusto minus natus exercitationem necessitatibus illo aliquid nisi laboriosam cum dicta. Quod, dicta aut? Sint, nam?
    </h5>
    <div className="h-screen"></div>
  </>;
};

export default Page;