
export const baseUrl = `${location.protocol}//${location.hostname}`

/**
 * 对象转字符串，效果同`qs.stringify()`
 * @param {Record<string, any>} query
 * @param {boolean} isAddPrefix 是否添加“?”前缀
 * @returns {string}
 */
const queryToString = (query = {}, isAddPrefix = false) => {
  const answer = Object.entries(query).map((item) => item.join("=")).join("&");
  if (isAddPrefix) return "?" + answer;
  return answer;
};

/**
 * 向Amadeus://{path}发送请求
 * @param {string} path 请求的路由，以“/”开头
 * @returns {any}
 */
export const request = async (path) => {
  const response = await fetch(`${baseUrl}:3030${path}`);
  if (!response.ok) {
    throw new Error(response.statusText);
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
};

/**
 * 获取扇贝每日一句
 * @returns {Promise<ShanbayResponse>}
 */
export const getShanbay = async () => {
  return await request("/shanbay");
};

/**
 * 获取文章列表
 * @param {number} page
 * @returns {Promise<BlogsResponse>}
 */
export const getBlogs = async (page = 1) => {
  return await request("/blogs" + queryToString({ page }, true));
};

/**
 * 获取番剧列表
 * @param {number} page
 * @returns {Promise<AnimesResponse>}
 */
export const getAnimes = async (page = 1) => {
  return await request("/animes" + queryToString({ page }, true));
};