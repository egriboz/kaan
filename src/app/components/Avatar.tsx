// import Greeting from "@components/Greeting";
interface AvatarProps {
  hue: number;
  className?: string;
}
export default function Avatar({ hue, className }: AvatarProps) {
  const hueRounded = Math.max(0, Math.min(360, Math.round(hue)));
  const newHue = hueRounded > 94 ? hueRounded + 94 : hueRounded;
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className={`relative flex flex-col items-center justify-center ${className}`}
        >
          <picture className="rounded-full bg-[#39ff14]">
            <img
              className="rounded-full object-cover opacity-90"
              // style={{ filter: "hue-rotate(113deg);" }}
              style={{ filter: `hue-rotate(${newHue}deg)` }}
              width={48}
              height={48}
              src="/kaanegriboz.jpg"
              alt="Kaan Eğriboz"
            />
          </picture>
          <div className="items-center text-center mt-4">
            <a
              href="https://www.youtube.com/@kaanegriboz"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-bold text-[0.70rem] h-12 rounded-full bg-transparent px-4 text-[#39ff14]"
            >
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[140%] group-hover:skew-y-12">
                  <span
                    style={{
                      display: "block",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    KAAN EĞRİBOZ
                    {/* <Greeting /> */}
                    {/* {newHue} */}
                  </span>
                </div>
                <div className="absolute translate-y-[140%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  <span
                    style={{
                      display: "block",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    KAAN EĞRİBOZ
                  </span>
                </div>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
