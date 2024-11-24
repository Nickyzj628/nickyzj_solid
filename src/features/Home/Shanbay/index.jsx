import Card from "@/components/Card";
import PicIcon from "@/components/icons/Pic";
import Section from "@/components/Section";
import Skelecton from "@/components/Skeleton";
import { clsx } from "@/services/dom";
import { getShanbay } from "@/services/network";
import { createResource, Match, Switch } from "solid-js";

/**
 * 每日一句
 * @param {Object} props
 * @param {string} props.className
 */
const Shanbay = (props) => {
  const [shanbayResp] = createResource(() => getShanbay());

  return (
    <div className={clsx("flex flex-col gap-1.5 aspect-[2/3]", props.className)}>
      <Section className="text-blue-300">
        每日一句
      </Section>
      <Switch>
        <Match when={shanbayResp.loading}>
          <Skelecton isAnimate className="flex-1 rounded-xl" />
        </Match>
        <Match when={shanbayResp.error}>
          <Skelecton className="flex items-center justify-center flex-1 rounded-xl">
            <div className={clsx("w-3/12 text-center text-zinc-400 transition dark:text-zinc-500")}>
              <PicIcon className="w-full" />
              <span className="text-sm">{shanbayResp.error.message}</span>
            </div>
          </Skelecton>
        </Match>
        <Match when={shanbayResp()}>
          <Card
            className="flex-1 hover:scale-[0.98]"
            image={shanbayResp().image}
            contentClassName="pb-5"
            title={shanbayResp().content}
            description={shanbayResp().translation}
            extra={`-- ${shanbayResp().author}`}
            extraClassName="text-right"
          />
        </Match>
      </Switch>
    </div>
  );
};

export default Shanbay;