/**
 * 生成随机整数
 * @param {number} min 下限（包含）
 * @param {number} max 上限（不包含）
 * @returns {number}
 */
export const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};