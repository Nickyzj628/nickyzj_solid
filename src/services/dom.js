import { delay } from "./time";

/**
 * 拼接className
 * @returns {string}
 */
export const clsx = (...args) => {
  return args.filter(Boolean).join(" ");
};

/**
 * 监听元素进入视野后执行函数
 * @param {HTMLElement} element 要观察的元素
 * @param {() => Promise<void>} fn 待执行函数
 * @returns {IntersectionObserver.disconnect}
 */
export const observe = (element, fn) => {
  const ob = new IntersectionObserver(async (entries) => {
    if (!entries[0].isIntersecting) return;
    await fn();
    ob.unobserve(element);
    await delay();
    ob.observe(element);
  })
  ob.observe(element);
  return ob.disconnect;
};