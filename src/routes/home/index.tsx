import { For, Show, createEffect, createSignal, onMount } from "solid-js"
import { getDateDiff, getImage, getPeriod, request } from "../../lib/utils"
import { user } from "../../lib/stores"
import Section from "../../components/section"
import Loading from "../../components/loading"

export default function Home() {
    const [getShanbay, setShanbay] = createSignal<Shanbay>()
    const [getBlogs, setBlogs] = createSignal<Blog[]>()
    // const [getAnimes, setAnimes] = createSignal<Anime[]>()
    onMount(async () => {
        const [res, err] = await request<Shanbay>("/shanbay")
        if (err || !res?.data) return console.warn(err)
        setShanbay(res.data)

        const [res2, err2] = await request<Blog[]>("/blogs")
        if (err2 || !res2?.data) return
        setBlogs(res2.data)

        // const [res3, err3] = await request<Anime[]>("/animes")
        // if (err3 || !res3?.data) return
        // setAnimes(res3.data)
    })
    createEffect(() => {
        console.log(getBlogs())
    })

    return <>
        <div class="w-full mb-2">
            <h5 class="text-zinc-400 dark:text-zinc-500">{getPeriod()}好，欢迎回来：</h5>
            <h1>{user.username}</h1>
        </div>

        <Section title="每日一句" color="bg-blue-300">
            <figure class="group relative w-[21rem] aspect-[2/3] bg-zinc-100 dark:bg-zinc-700 rounded-2xl overflow-hidden transition">
                <Show when={getShanbay()} fallback={<Loading />}>
                    <img src={getShanbay()!.image} alt="" class="w-full h-full object-cover group-hover:scale-110" />
                    <figcaption class="absolute bottom-0 flex flex-col gap-1 px-3 pt-7 pb-3 group-hover:pb-8 text-white bg-gradient-to-t from-black to-transparent transition-all">
                        <p class="text-lg">{getShanbay()!.content}</p>
                        <p class="text-sm">{getShanbay()!.translation}</p>
                        <p class="opacity-0 group-hover:opacity-100 h-0 text-sm text-right transition">-- {getShanbay()!.author}</p>
                    </figcaption>
                </Show>
            </figure>
        </Section>

        <Section title="近期博客" color="bg-red-300" class="flex flex-col">
            <div class="flex flex-col flex-1 w-[21rem] bg-zinc-100 dark:bg-zinc-700 rounded-2xl overflow-hidden transition">
                <Show when={getBlogs()} fallback={<Loading />}>
                    <For each={getBlogs()!.slice(0, 3)}>{(blog, index) =>
                        <a href={`/blogs/${blog.id}`} class="!no-underline flex-1 bg-center bg-cover" style={{ "background-image": `url(${getImage(`/blogs/${blog.id}.webp`)})` }}>
                            <div class={"group flex flex-col items-center justify-center w-full h-full transition " + (index() === 0 ? "bg-black/40" : "bg-black/60 hover:bg-black/40")}>
                                <h4 class={index() === 0 ? "text-white" : "text-zinc-400 dark:text-zinc-400 group-hover:text-white"}>{blog.title}</h4>
                                <p class={"text-sm transition " + (index() === 0 ? "text-zinc-200" : "text-zinc-400 group-hover:text-zinc-200")}>{getDateDiff(blog.updated)}</p>
                            </div>
                        </a>
                    }</For>
                </Show>
            </div>
        </Section>
    </>
}