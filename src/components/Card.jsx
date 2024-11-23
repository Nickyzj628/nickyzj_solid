import { Show } from "solid-js";
import { twMerge } from "tailwind-merge";

/**
 * 卡片，目前只有一种风格，预计收录vuesax全部风格
 * @param {Object} props
 * @param {string} props.className
 * @param {string} props.image
 * @param {string} props.contentClassName
 * @param {string} props.title
 * @param {string} props.titleClassName
 * @param {string} props.description
 * @param {string} props.descriptionClassName
 * @param {string} props.extra
 * @param {string} props.extraClassName
 */
const Card = (props) => {
  return (
    <div className={twMerge("group/card relative rounded-xl overflow-hidden transition hover:scale-95", props.className)}>
      <Show when={props.image}>
        <img src={props.image} alt="" className="size-full bg-zinc-200 group-hover/card:scale-110 dark:bg-zinc-800" />
      </Show>
      <Show when={props.title || props.description || props.extra}>
        <div className={twMerge("absolute bottom-0 w-full pt-8 pb-3 px-3 bg-gradient-to-t from-black transition-all", props.extra ? "group-hover/card:pb-10" : "group-hover/card:pb-7", props.contentClassName)}>
          <h3 title={props.title} className={twMerge("text-white dark:text-zinc-200", props.titleClassName)}>{props.title}</h3>
          <p className={twMerge("mt-1 text-sm text-zinc-100 transition dark:text-zinc-300", props.descriptionClassName)}>{props.description}</p>
          <p className={twMerge("opacity-0 h-0 text-sm text-zinc-100 transition group-hover/card:opacity-100 dark:text-zinc-300", props.extraClassName)}>{props.extra}</p>
        </div>
      </Show>
    </div>
  );
};

export default Card;