import { useUserContext } from "@/contexts/user";
import Animes from "@/features/Home/Animes";
import Blogs from "@/features/Home/Blogs";
import Shanbay from "@/features/Home/Shanbay";
import { getPeriod } from "@/services/time";
import { Title } from "@solidjs/meta";
import styles from "./index.module.css";

const Page = () => {
  const [user] = useUserContext();

  return <>
    <Title>NICKYZJ</Title>

    <div className="w-full">
      <h4 className="text-zinc-500 dark:text-zinc-500">{getPeriod()}好，欢迎回来：</h4>
      <h1>{user().name}</h1>
    </div>
    <Shanbay className={styles.section} />
    <Blogs className={styles.section} />
    <Animes className={styles.section} />
  </>;
};

export default Page;