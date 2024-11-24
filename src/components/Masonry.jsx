import { delay, throttle } from "@/services/time";
import { createMemo, onCleanup, onMount } from "solid-js";
import { twMerge } from "tailwind-merge";

/** grid每行高度，越小越好 */
const ROW_HEIGHT = 2;

/**
 * 瀑布流，核心思路是用grid-auto-rows设置每行高度为2px，再用grid-row-end设置一个元素占几份行高
 * @param {Object} props
 * @param {string} props.className
 * @param {number} props.gap 间隔几份元素，并非像素
 * @param {HTMLElement} props.children
 */
const Masonry = (props) => {
  /** @type {HTMLDivElement} */
  let container = null;

  const getGap = createMemo(() => props.gap || 1);

  // 计算元素所占行数
  const calcRows = throttle(() => {
    // 获取容器下的所有一级子元素
    const items = container.querySelectorAll(":scope > *");
    // 获取当前列数
    const cols = window.getComputedStyle(container).gridTemplateColumns.split(" ").length;
    items.forEach((item, index) => {
      // 给元素增加上间距（每列第一个元素不给）
      const marginTop = index >= cols ? getGap() : 0;
      // 根据元素高度设置元素占用的行数
      // Math.floor/ceil都会导致少量元素少/多一份行高
      // 折中一下使用round，配合尽可能小的ROW_HEIGHT，最坏情况只少/多占用半份行高
      const rows = Math.round(item.clientHeight / ROW_HEIGHT) + marginTop;
      item.style.gridRowEnd = `span ${rows}`;
    });
  });

  // 图片全部加载完成再排版
  let loadedImageCount = 0;
  const ob = new MutationObserver(() => {
    const images = container.querySelectorAll("img");
    const onImageLoad = async () => {
      if (++loadedImageCount < images.length) return;
      calcRows();
      // 初次排版结束再展示瀑布流
      await delay();
      container.style.visibility = "visible";
    };
    images.forEach((image) => {
      image.onload = onImageLoad;
    });
  });

  onMount(() => {
    ob.observe(container, {
      childList: true,
    });
    window.addEventListener("resize", calcRows);
  });

  onCleanup(() => {
    ob.disconnect();
    window.removeEventListener("resize", calcRows);
    loadedImageCount = 0;
  });

  return (
    <div
      ref={container}
      className={twMerge("grid grid-cols-4 items-end", props.className)}
      style={{
        "visibility": "hidden",
        "grid-auto-rows": `${ROW_HEIGHT}px`,
        "column-gap": `${ROW_HEIGHT * getGap()}px`
      }}
    >
      {props.children}
    </div>
  );
};

export default Masonry;