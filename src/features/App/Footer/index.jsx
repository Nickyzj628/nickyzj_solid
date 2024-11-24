const Footer = () => {
  return (
    <footer className="bento flex items-center justify-center gap-1 text-sm text-zinc-400 transition dark:text-zinc-500">
      <span>由</span>
      <a href="https://www.solidjs.com/" target="_blank" className="transition-none">Solid</a>
      <span>+</span>
      <a href="https://tailwindcss.com/" target="_blank" className="transition-none">Tailwind CSS</a>
      <span>驱动</span>
    </footer>
  );
};

export default Footer;