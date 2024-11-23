import AlbumIcon from "@/components/icons/Album";
import Section from "@/components/Section";
import Skelecton from "@/components/Skeleton";
import { clsx } from "@/services/dom";
import { getBlogs, getImage } from "@/services/network";
import { removeSpaces } from "@/services/string";
import dayjs from "dayjs";
import { createResource, For, Match, Switch } from "solid-js";
import styles from "./index.module.css";

/**
 * 近期文章
 * @param {Object} props
 * @param {string} props.className
 */
const Blogs = (props) => {
  const [blogsResp] = createResource(() => getBlogs());
  const blogs = () => blogsResp()?.blogs.filter((blog) => blog.visibility === 1).slice(0, 3) ?? [];

  return (
    <div className={clsx(styles.container, "flex flex-col gap-1.5 aspect-[2/3]", props.className)}>
      <Section className="text-red-300">
        近期文章
      </Section>
      <div className="group relative flex-1 rounded-xl overflow-hidden">
        <Switch>
          <Match when={blogsResp.loading}>
            <Skelecton isAnimate className="size-full" />
          </Match>
          <Match when={blogsResp.error}>
            <Skelecton className="flex items-center justify-center size-full">
              <div className={clsx("w-3/12 text-center text-zinc-400 transition dark:text-zinc-500")}>
                <AlbumIcon className="w-full" />
                <span className="text-sm">{blogsResp.error.message}</span>
              </div>
            </Skelecton>
          </Match>
          <Match when={blogsResp().blogs}>
            <For each={blogs()}>
              {(blog, index) => (
                <a href={`/blogs/${blog.id}`} className={clsx("block w-full h-1/3 bg-zinc-200 bg-center bg-cover hover:no-underline", index() === 0 ? "brightness-100" : "brightness-50 hover:brightness-100")} style={{ "background-image": `url(${getImage(`/blogs/${blog.id}.webp`)})` }}>
                  <div className={clsx("flex flex-col items-center justify-center size-full bg-black/40")}>
                    <h4 className="text-white">{blog.title}</h4>
                    <span className="text-sm text-white">{removeSpaces(dayjs(parseInt(blog.id, 36)).fromNow())}</span>
                  </div>
                </a>
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default Blogs;