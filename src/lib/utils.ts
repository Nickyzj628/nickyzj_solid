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

/** 获取当前时间段 */
export function getPeriod() {
    const hour = new Date().getHours()
    if (hour <= 9) return "早上"
    if (hour > 9 && hour <= 12) return "上午"
    if (hour > 12 && hour <= 17) return "下午"
    return "晚上"
}

/** 计算给定时间距离当前有多久 */
export function getDateDiff(date: string | number | Date) {
    let res = Date.now() - new Date(date).getTime()
    if (Number.isNaN(res)) return ""
    const suffix = Math.sign(res) > 0 ? "前" : "后"
    if ((res = Math.abs(res) / 1000) < 60) return Math.floor(res) + "秒" + suffix
    if ((res /= 60) < 60) return Math.floor(res) + "分钟" + suffix
    if ((res /= 60) < 24) return Math.floor(res) + "小时" + suffix
    if ((res /= 24) < 30) return Math.floor(res) + "天" + suffix
    if ((res /= 30) < 12) return Math.floor(res) + "个月" + suffix
    return Math.floor(res / 12) + "年" + suffix
}



/** ------------ 接口 ------------ **/

/** 获取AList://Nickyzj/Photos下的图片资源 */
export function getImage(path: string) {
    return `http://nickyzj.run:2020/d/Nickyzj/Photos${path}`
}

/** 从Express服务器请求数据 */
export async function request<T>(path: string, options: RequestInit = {}): Promise<[Res<T> | null, string]> {
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
        return [res, ""]
    }
    catch (err: any) {
        return [null, err.message]
    }
}



/** ------------ 杂项 ------------ **/

/** 设置页面标题 */
export function setTitle(...titles: string[]) {
    document.title = [...titles, "NICKYZJ"].join(" / ")
}