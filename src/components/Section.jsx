import { clsx } from "@/services/dom";

/**
 * 一个区域的标题部分
 * @param {Object} props
 * @param {string} props.className
 */
const Section = (props) => {
  return (
    <div className={clsx("flex items-center gap-1.5", props.className ?? "text-zinc-300")}>
      <div className="w-2.5 h-6 rounded-full bg-current transition dark:brightness-75" />
      <h4>{props.children}</h4>
    </div>
  );
};

export default Section;