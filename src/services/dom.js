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
 * @param {() => Promise<boolean | void>} fn 待执行函数，返回false代表可以销毁观察者
 * @param {IntersectionObserverInit} config IntersectionObserver配置项
 * @returns {IntersectionObserver}
 */
export const useInViewport = (element, fn, config = {}) => {
  const ob = new IntersectionObserver(async (entries) => {
    if (!entries[0].isIntersecting) return;
    const isContinuable = await fn();
    await delay();
    ob.unobserve(element);
    if (isContinuable === false) return;
    ob.observe(element);
  }, config);
  ob.observe(element);
  return ob;
};