import { getImage } from "@/services/network";
import { createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";

/**
 * 头像，默认显示当前用户的
 * @param {Object} props
 * @param {string} props.name 用户名，以此获取头像
 * @param {string} props.className
 */
const Avatar = (props) => {
  const [getSrc, setSrc] = createSignal(getImage(`Avatars/${props.name ?? "Guest"}.webp`));

  return (
    <img
      src={getSrc()}
      alt=""
      className={twMerge("size-12 rounded-full", props.className)}
      onError={() => setSrc(getImage("Avatars/Guest.webp"))}
    />
  );
};

export default Avatar;