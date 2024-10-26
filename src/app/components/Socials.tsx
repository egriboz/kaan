export default function Socials() {
  return (
    <>
      <div className="">
        <a
          href="https://www.youtube.com/@kaanegriboz"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative font-bold text-[0.70rem] h-12 rounded-full bg-transparent px-4 text-[#39ff14]"
        >
          <span className="relative inline-flex overflow-hidden">
            <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[140%] group-hover:skew-y-12">
              YOUTUBE
            </div>
            <div className="absolute translate-y-[140%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
              YOUTUBE
            </div>
          </span>
        </a>
      </div>
    </>
  );
}
