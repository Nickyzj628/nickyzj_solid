export const baseUrl = `${location.protocol}//${location.hostname}`

/**
 * 向Amadeus://{path}发送请求
 * @param {string} path 请求的路由，以“/”开头
 * @returns {any}
 */
export const request = async (path) => {
  const response = await fetch(`${baseUrl}:3030${path}`);
  if (!response.ok) {
    throw new Error("网络连接中断");
  }

  const data = await response.json();
  if (data.statusCode !== 200) {
    throw new Error(data.message);
  }

  return data;
};

/**
 * 从AList://Nickyzj/Photos{path}获取图片
 * @param {string} path 图片的相对路径，以“/”开头
 * @returns {string}
 */
export const getImage = (path) => {
  return `${baseUrl}:2020/d/Nickyzj/Photos/${path}`;
};

/**
 * 从Alist://Nickyzj/Animes/{...anime}/{ep}获取番剧播放地址
 * @param {Anime} anime 
 * @param {number} ep 
 * @returns {string}
 */
export const getAnimeVideo = (anime, ep = 1) => {
  return `${baseUrl}:2020/d/Nickyzj/Animes/${anime.cate}/${anime.title}/${anime.episodes[ep - 1]}`
}