import { useState } from "react";
import Greeting from "@components/Greeting";

type CopyMailAddressProps = {
  className?: string; // className isteğe bağlı
};

export default function CopyMailAddress({ className }: CopyMailAddressProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("egriboz@gmail.com");
    setIsCopied(true);

    // 3 saniye sonra "Email Copied!" metnini eski haline döndürelim
    setTimeout(() => {
      setIsCopied(false);
    }, 300);
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className={`sayHello group relative h-10 rounded-full bg-transparent font-bold text-[#39ff14] text-[0.70rem] ${className}`}
      >
        <span className=" relative inline-flex overflow-hidden">
          <div
            className={`translate-y-0 skew-y-0 transition duration-500 ${
              isCopied ? "-translate-y-[140%] skew-y-22 " : ""
            } group-hover:-translate-y-[140%] group-hover:skew-y-12 whitespace-nowrap px-5`}
          >
            <span
              style={{
                display: "block",
                width: "100px",
                textAlign: "center",
              }}
            >
              <Greeting />
            </span>
          </div>
          <div
            className={`absolute translate-y-[140%] skew-y-22 transition duration-500  ${
              isCopied ? "translate-y-0 skew-y-0 " : ""
            } group-hover:translate-y-0 group-hover:skew-y-0 whitespace-nowrap px-5`}
          >
            <span
              style={{
                display: "block",
                width: "100px",
                textAlign: "center",
              }}
            >
              {isCopied ? "COPIED!" : "COPY EMAIL"}
            </span>
          </div>
        </span>
      </button>
      {/* <svg className="worm" x="0px" y="0px" viewBox="0 0 316 40">
        <path
          d="M6.5,6.5c30,0,30,26.9,60,26.9c30,0,30-26.9,60-26.9c30,0,30,26.9,60,26.9c30,0,30-26.9,60-26.9
	c30,0,30,26.9,60,26.9"
        />
      </svg> */}
    </>
  );
}
