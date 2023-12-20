/** ------------ 时间 ------------ **/

/** 节流 */
export function useThrottle(fn: Function, time = 150) {
    let timer = 0
    return () => {
        if (timer) return
        timer = setTimeout(() => {
            fn()
            timer = 0
        }, time)
    }
}



/** ------------ 接口 ------------ **/

/** 获取AList://Nickyzj/Photos下的图片资源 */
export function getImage(path: string) {
    return `http://nickyzj.run:2020/d/Nickyzj/Photos${path}`
}



/** ------------ 杂项 ------------ **/

/** 设置页面标题 */
export function setTitle(...titles: string[]) {
    document.title = [...titles, "NICKYZJ"].join(" | ")
}