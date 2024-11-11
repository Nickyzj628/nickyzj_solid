import AlertIcon from "@/components/icons/Alert";
import CheckCircleIcon from "@/components/icons/CheckCircle";
import CloseCircleIcon from "@/components/icons/CloseCircle";
import InformationIcon from "@/components/icons/Information";
import { delay } from "@/services/time";
import { createSignal, For, Match, onMount, Switch } from "solid-js";

/**
 * @typedef {Object} Toast
 * @property {string} id
 * @property {"success" | "info" | "warning" | "error"} type
 * @property {string} message
 */

/** @type {import("solid-js").Signal<Toast[]>} */
const [getToasts, setToasts] = createSignal([]);
const [getToastsHeight, setToastsHeight] = createSignal(0);

/**
 * 右下角追加一条提示
 * @param {string} message 
 * @param {Toast["type"]} type 
 */
export const toast = (message, type = "info") => {
  setToasts((toasts) => {
    toasts.push({
      id: Date.now().toString(36),
      type,
      message,
    });
    return toasts.slice();
  });
};

/** @param {string} message  */
toast.success = (message) => toast(message, "success");

/** @param {string} message  */
toast.warning = (message) => toast(message, "warning");

/** @param {string} message  */
toast.error = (message) => toast(message, "error");

/** @param {Toast} props */
const Toast = (props) => {
  /** @type {HTMLDivElement} */
  let ref;
  onMount(async () => {
    // 将自身高度累加给toastsHeight，以实现Toaster动态高度
    setToastsHeight(getToastsHeight() + ref.offsetHeight);
    // 一段时间后假隐藏
    await delay(4000);
    ref.style.opacity = 0;
    // 真隐藏
    await delay(150);
    ref.style.display = "none";
  });

  return (
    <div ref={ref} className="flex items-center gap-3 w-fit p-3 rounded-xl shadow-xl bg-white transition dark:bg-zinc-800">
      <Switch>
        <Match when={props.type === "info"}>
          <InformationIcon className="size-6 text-blue-500" />
        </Match>
        <Match when={props.type === "success"}>
          <CheckCircleIcon className="size-6 text-green-500" />
        </Match>
        <Match when={props.type === "warning"}>
          <AlertIcon className="size-6 text-yellow-500" />
        </Match>
        <Match when={props.type === "error"}>
          <CloseCircleIcon className="size-6 text-red-500" />
        </Match>
      </Switch>
      <span className="text-zinc-800 dark:text-zinc-200">{props.message}</span>
    </div>
  )
};

const Toaster = () => {
  /** @type {HTMLDivElement} */
  let ref;
  onMount(() => {
    // 容器高度回到0时清空状态
    let isFirst = true;
    const ob = new ResizeObserver(([entry]) => {
      if (entry.target.offsetHeight !== 0) return;
      // 修复第一个元素加入时offsetHeight=0仍会清空状态的问题
      if (entry.target.children.length === 1 && isFirst) {
        isFirst = false;
        return;
      }
      setToastsHeight(0);
      setToasts([]);
      isFirst = true;
    });
    ob.observe(ref);
  });

  return (
    <div
      ref={ref}
      className="fixed bottom-3 right-3 z-20 flex flex-col items-end gap-3 w-96 transition-all"
      style={{
        "max-height": `${getToastsHeight() + ((getToasts().length || 1) - 1) * 12}px`,
      }}
    >
      <For each={getToasts()}>
        {(toast) => (
          <Toast {...toast} />
        )}
      </For>
    </div>
  )
};

export default Toaster;