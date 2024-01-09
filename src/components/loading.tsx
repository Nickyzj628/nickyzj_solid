import { BiRegularLoaderAlt } from "solid-icons/bi"

export default function Loading() {
    return (
        <div class="flex items-center justify-center w-full h-full text-zinc-500">
            <BiRegularLoaderAlt size={40} class="animate-spin" />
        </div>
    )
}