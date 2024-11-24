/**
 * 
 * @param {Object} props
 * @param {string} props.className
 * @param {string} props.time
 * @param {HTMLElement} props.children
 */
const Timeline = (props) => {
  return (
    <div className={props.className}>
      <div className="pl-2">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{props.time}</h3>
      </div>
      <div className="flex gap-x-1">
        <div className="relative after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:-translate-x-[0.5px] after:bg-zinc-300 after:transition last:after:hidden dark:after:bg-zinc-600">
          <div className="relative z-10 flex size-7 items-center justify-center">
            <div className="size-2 rounded-full bg-zinc-400 transition dark:bg-zinc-600"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 flex-1 mb-2 pt-2.5 pb-8">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Timeline;