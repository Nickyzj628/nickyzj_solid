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
    return `${location.protocol}//${location.hostname}:2020/d/Nickyzj/Photos${path}`
}