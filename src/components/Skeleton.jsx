import { clsx } from "@/services/dom";

/**
 * 骨架屏
 * @param {Object} props
 * @param {string} props.className
 * @param {boolean} props.isAnimate 闪烁效果
 * @param {HTMLElement} props.children
 */
const Skelecton = (props) => {
  return (
    <div className={clsx("bg-zinc-200 transition dark:bg-zinc-800", props.isAnimate && "animate-pulse", props.className)} >
      {props.children}
    </div>
  );
};

export default Skelecton;