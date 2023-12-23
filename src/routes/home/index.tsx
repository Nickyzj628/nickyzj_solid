import { createSignal, onMount } from "solid-js"
import { request } from "../../lib/util"

export default function Home() {
    const [getShanbay, setShanbay] = createSignal<any>({})
    onMount(async () => {
        const [shanbay, err] = await request("/shanbay")
        if (err) return
        setShanbay(shanbay)
    })
    return <>
        <h1>{getShanbay()?.shanbay?.content}</h1>
        <p class="mt-2">{getShanbay()?.shanbay?.translation}</p>
    </>
}