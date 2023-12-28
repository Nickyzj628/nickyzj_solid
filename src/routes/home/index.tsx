import { createEffect, createSignal, onMount } from "solid-js"
import { request } from "../../lib/util"

export default function Home() {
    const [getShanbay, setShanbay] = createSignal<Shanbay>()
    const [getBlogs, setBlogs] = createSignal<Blog[]>()
    const [getAnimes, setAnimes] = createSignal<Anime[]>()
    onMount(async () => {
        const [res, err] = await request<Shanbay>("/shanbay")
        if (err || !res?.data) return
        setShanbay(res.data)

        const [res2, err2] = await request<Blog[]>("/blogs")
        if (err2 || !res2?.data) return
        setBlogs(res2.data)

        const [res3, err3] = await request<Anime[]>("/animes")
        if (err3 || !res3?.data) return
        setAnimes(res3.data)
    })
    createEffect(() => {
        console.log(getShanbay(), getBlogs(), getAnimes())
    })
    return <h1>Hello, home.</h1>
}