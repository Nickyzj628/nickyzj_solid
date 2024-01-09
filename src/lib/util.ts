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

/** 从Express服务器请求数据 */
export async function request<T>(path: string, options: RequestInit = {}): Promise<[Res<T> | null, unknown]> {
    // 设置请求头
    if (options.body && !(options.body instanceof FormData)) {
        options.headers = {
            "Authorization": localStorage.token || "",
            "Content-Type": "application/json",
            ...options.headers
        }
        options.body = JSON.stringify(options.body)
    }
    // 发送请求
    try {
        const res: Res<T> = await fetch(`http://nickyzj.run:3030${path}`, options).then(res => res.json())
        if (res?.message) throw res.message
        return [res, null]
    }
    catch (err) {
        console.warn(err);
        return [null, err]
    }
}



/** ------------ 杂项 ------------ **/

/** 设置页面标题 */
export function setTitle(...titles: string[]) {
    document.title = [...titles, "NICKYZJ"].join(" / ")
}