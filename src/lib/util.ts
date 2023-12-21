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

/** 从Express服务器请求数据 */
export async function request(path: string) {
    try {
        const res = await fetch(`http://nickyzj.run:3030/${path}`).then(res => res.json())
        return [res, null]
    }
    catch (err) {
        console.warn(err);
        return [null, err]
    }
}

/** 获取AList://Nickyzj/Photos下的图片资源 */
export function getImage(path: string) {
    return `http://nickyzj.run:2020/d/Nickyzj/Photos${path}`
}



/** ------------ 杂项 ------------ **/

/** 设置页面标题 */
export function setTitle(...titles: string[]) {
    document.title = [...titles, "NICKYZJ"].join(" | ")
}