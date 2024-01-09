import type { JSX } from "solid-js"

export default function Section(props: { title: string; children: JSX.Element; color?: string; class?: string }) {
    return (
        <section class={props.class}>
            <header class="flex items-center gap-1.5 mb-1.5">
                <span class={"w-2.5 h-6 rounded-full " + (props.color ?? "bg-zinc-300")}></span>
                <h4>{props.title}</h4>
            </header>
            {props.children}
        </section>
    )
}