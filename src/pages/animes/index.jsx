import Card from "@/components/Card";
import Masonry from "@/components/Masonry";
import Skelecton from "@/components/Skeleton";
import { useInViewport } from "@/services/dom";
import { getImage, getAnimes as requestAnimes } from "@/services/network";
import { removeSpaces } from "@/services/string";
import { Title } from "@solidjs/meta";
import dayjs from "dayjs";
import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";

const Page = () => {
  /** @type {HTMLDivElement} */
  let loader = null;
  /** @type {IntersectionObserver} */
  let ob = null;

  const [getAnimes, setAnimes] = createSignal([]);
  const [getPage, setPage] = createSignal(0);
  const [getPages, setPages] = createSignal(Infinity);

  onMount(() => {
    const onInViewport = async () => {
      if (getPage() === getPages()) return false;
      const resp = await requestAnimes(getPage() + 1);
      setPage(resp.page);
      setPages(resp.pages);
      const animes = resp.animes.map((anime) => {
        anime.updatedLabel = removeSpaces(dayjs(anime.updated).fromNow());
        return anime;
      });
      setAnimes([...getAnimes(), ...animes]);
    };
    ob = useInViewport(loader, onInViewport);
  });

  onCleanup(() => {
    ob?.disconnect?.();
  });

  return <>
    <Title>番剧 / NICKYZJ</Title>

    <Masonry gap={6} className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full">
      <For each={getAnimes()}>
        {(anime) => (
          <a href={`/animes/${anime.id}`}>
            <Card
              image={getImage(`/animes/${anime.id}.webp`)}
              title={anime.title}
              titleClassName="text-lg"
              description={`第${anime.eps}话`}
              extra={`更新于${anime.updatedLabel}`}
            />
          </a>
        )}
      </For>
    </Masonry>

    <div ref={loader} className="absolute bottom-1/3" />
  </>;
};

export default Page;