import Card from "@/components/Card";
import CloseCircleIcon from "@/components/icons/CloseCircle";
import Section from "@/components/Section";
import Skelecton from "@/components/Skeleton";
import Timeline from "@/components/Timeline";
import { clsx } from "@/services/dom";
import { getAnimes, getImage } from "@/services/network";
import dayjs from "dayjs";
import { createResource, For, Match, Switch } from "solid-js";

const UPDATED_DAY_LABEL = ["今天", "昨天", "前天"];

/**
 * 本季新番
 * @param {Object} props
 * @param {string} props.className
 */
const Animes = (props) => {
  const [animesResp] = createResource(() => getAnimes());
  const groupedAnimes = () => {
    if (!animesResp()?.animes?.length) return [];
    const now = dayjs();
    const result = Array(21).fill().map(() => []);
    animesResp().animes.forEach((anime) => {
      anime.updatedDay = now.diff(dayjs(anime.updated), "day");
      // 筛去大概率不属于本季的番剧
      if (anime.updatedDay > 21) return false;
      // 剩余新番加入对应几天前更新的二维数组
      result[anime.updatedDay].push(anime);
    });
    return result.filter((group) => group.length > 0);
  };

  return (
    <div className={clsx("flex flex-col gap-1.5 flex-1", props.className)}>
      <Section className="text-yellow-300">
        本季新番
      </Section>
      <div className="relative flex-1 p-3 rounded-xl bg-zinc-200 overflow-x-hidden transition dark:bg-zinc-800">
        <Switch>
          <Match when={animesResp.loading}>
            <Skelecton isAnimate className="size-full" />
          </Match>
          <Match when={animesResp.error}>
            <Skelecton className="flex items-center justify-center size-full">
              <div className={clsx("w-3/12 text-center text-zinc-400 transition dark:text-zinc-500")}>
                <CloseCircleIcon className="w-full" />
                <span className="text-sm">{animesResp.error.message}</span>
              </div>
            </Skelecton>
          </Match>
          <Match when={animesResp()}>
            <For each={groupedAnimes()}>
              {(group) => (
                <Timeline time={UPDATED_DAY_LABEL[group[0].updatedDay] ?? `${group[0].updatedDay}天前`}>
                  <For each={group}>
                    {(anime) => (
                      <a href={`/animes/${anime.id}`}>
                        <Card
                          className="max-w-36 aspect-[2/3]"
                          image={getImage(`/animes/${anime.id}.webp`)}
                          contentClassName="pb-3 group-hover/card:pb-4"
                          title={anime.title}
                          titleClassName="truncate-2 text-lg"
                          description={`第${anime.eps}话`}
                        />
                      </a>
                    )}
                  </For>
                </Timeline>
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default Animes;