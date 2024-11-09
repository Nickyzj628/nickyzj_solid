/**
 * 延迟一段时间执行后续代码
 * @param {number} ms 延迟时间
 */
export const delay = async (ms = 150) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * 防抖，使传入的函数距离上次调用一段时间后再执行
 * @param {Function} fn 待执行函数
 * @param {number} ms 间隔时间，默认150ms
 */
export const debounce = (fn, ms = 150) => {
  let timer = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
};

/**
 * 节流，使传入的函数在一段时间内只执行一次
 * @param {Function} fn 待执行函数
 * @param {number} ms 触发频率，默认150ms
 */
export const throttle = (fn, ms = 150) => {
  let isCountdown = false;
  return async () => {
    if (isCountdown) return;
    isCountdown = true;
    await delay(ms);
    fn();
    isCountdown = false;
  };
};

/**
 * 获取当前时间段
 * @returns {string}
 */
export const getPeriod = () => {
  const hour = new Date().getHours();
  if (hour < 6) return "凌晨";
  if (hour >= 6 && hour <= 8) return "早上";
  if (hour >= 9 && hour <= 11) return "上午";
  if (hour === 12) return "中午";
  if (hour >= 13 && hour <= 17) return "下午";
  if (hour >= 18 && hour <= 19) return "傍晚";
  return "晚上";
};