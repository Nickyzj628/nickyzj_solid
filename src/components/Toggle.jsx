import { clsx } from "../services/dom";

/**
 * 开关
 * @param {Object} props
 * @param {string} props.className
 * @param {boolean} props.value
 * @param {(newValue: boolean) => void} props.onChange
 */
const Toggle = (props) => {
  return (
    <button
      className={clsx("flex-col justify-center gap-2 size-10 px-3", props.className)}
      onClick={() => props.onChange?.(!props.value)}
      onBlur={() => props.onChange?.(false)}
    >
      <div className={clsx("w-full h-0.5 rounded-full bg-zinc-600 transition dark:bg-zinc-400", props.value && "translate-y-[5px] rotate-45")}></div>
      <div className={clsx("w-full h-0.5 rounded-full bg-zinc-600 transition dark:bg-zinc-400", props.value && "-translate-y-[5px] -rotate-45")}></div>
    </button>
  )
};

export default Toggle;