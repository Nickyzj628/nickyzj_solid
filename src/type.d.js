/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Shanbay
 * @property {string} content
 * @property {string} translation
 * @property {string} author
 * @property {string} image
 * @property {string} href
 */

/**
 * @typedef {Object} Blog
 * @property {string} id
 * @property {string} title
 * @property {number} visibility
 * @property {number} updated
 * @property {number} minutes
 * @property {string} content
 */

/**
 * @typedef {Object} Anime
 * @property {string} id
 * @property {string} title
 * @property {string} cate
 * @property {number} eps
 * @property {string} ep_pattern
 * @property {string[]} episodes
 * @property {number} updated
 */



/**
 * @typedef {Object} Response
 * @property {number} statusCode
 * @property {string} message
 */

/**
 * @typedef {Object} PageResponse
 * @property {number} page
 * @property {number} pageSize
 * @property {number} pages
 */

/**
 * @typedef {Response & Shanbay} ShanbayResponse
 */

/**
 * @typedef {Response & PageResponse & {blogs: Blog[]}} BlogsResponse
 */

/**
 * @typedef {Response & PageResponse & {animes: Anime[]}} AnimesResponse
 */