"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import SpotifyCurrentlyPlaying from "@components/SpotifyCurrentlyPlaying";
import Socials from "@components/Socials";
import Avatar from "@components/Avatar";
// import CopyMailAddress from "@components/CopyMailAddress";
import SpecialDays from "@components/SpecialDays";

interface Orientation {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

const HomePage: React.FC = () => {
  const [lastY, setLastY] = useState(0);

  const [orientation, setOrientation] = useState<Orientation>({
    alpha: null,
    beta: null,
    gamma: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        setOrientation({
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma,
        });
      };
      window.addEventListener("deviceorientation", handleOrientation);
      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, []);

  useEffect(() => {
    const applyFontVariationWithOrientation = () => {
      const activeFont = [...document.getElementById("text")!.classList].find(
        (cls) => cls.startsWith("font-")
      );
      const fontSettings = {
        "font-serif": {
          weightMin: 300,
          weightMax: 900,
          slantMin: 0,
          slantMax: -16,
        },
        "font-sans": {
          weightMin: 200,
          weightMax: 900,
          slantMin: 0,
          slantMax: -24,
        },
      };

      const settings =
        fontSettings[activeFont as "font-serif" | "font-sans"] ||
        fontSettings["font-sans"];

      if (orientation.beta !== null && orientation.gamma !== null) {
        const weight =
          settings.weightMin +
          (orientation.beta / 180) * (settings.weightMax - settings.weightMin);
        const slant =
          settings.slantMin +
          (orientation.gamma / 90) * (settings.slantMax - settings.slantMin);

        document.querySelectorAll(".char").forEach((char) => {
          (
            char as HTMLElement
          ).style.fontVariationSettings = `"wght" ${weight}, "slnt" ${slant}`;
        });
      }
    };

    if (orientation.beta !== null && orientation.gamma !== null) {
      applyFontVariationWithOrientation();
    }
  }, [orientation]);

  useEffect(() => {
    const playChars = document.querySelectorAll<HTMLElement>(".char");
    const textContainer = document.getElementById("text") as HTMLElement;
    const wrapper = document.getElementById("wrapper") as HTMLElement;
    const avatarBtn =
      document.querySelectorAll<HTMLButtonElement>(".avatarBtn");
    const changeFontButtons =
      document.querySelectorAll<HTMLButtonElement>(".js-change-font");
    const triggerAnimationButton = document.querySelector<HTMLButtonElement>(
      ".js-trigger-animation"
    );
    const axisLines = document.querySelectorAll<HTMLElement>(".axis-line");
    const labels = document.querySelectorAll<HTMLElement>(".label");
    const buttonWrapper =
      document.querySelectorAll<HTMLElement>(".button-wrapper");

    const fontSettings: Record<
      string,
      {
        weightMin: number;
        weightMax: number;
        slantMin: number;
        slantMax: number;
      }
    > = {
      "font-serif": {
        weightMin: 300,
        weightMax: 900,
        slantMin: 0,
        slantMax: -16,
      },
      "font-sans": {
        weightMin: 200,
        weightMax: 900,
        slantMin: 0,
        slantMax: -24,
      },
    };

    const animationSettings = {
      duration: 1,
      stagger: 0.05,
      ease: "power3.out",
    };

    let animationTimeline: gsap.core.Timeline | undefined;
    let lastX = 0;
    let lastY = 0;

    function updateText(e: MouseEvent | TouchEvent) {
      if (e instanceof MouseEvent) {
        lastX = e.clientX;
        lastY = e.clientY;
        setLastY(e.clientY);
      } else if (e instanceof TouchEvent) {
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      }
      applyFontVariation();
    }

    function applyFontVariation() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const activeFont =
        [...textContainer.classList].find((cls) => cls.startsWith("font-")) ||
        "";
      const settings = fontSettings[activeFont];

      if (!settings) return;

      const weight =
        settings.weightMin +
        (lastY / height) * (settings.weightMax - settings.weightMin);
      const slant =
        settings.slantMin +
        ((lastX - width / 2) / (width / 2)) *
          (settings.slantMax - settings.slantMin);

      playChars.forEach((char) => {
        char.style.fontVariationSettings = `"wght" ${weight}, "slnt" ${slant}`;
      });
    }

    function setupInitialStates() {
      gsap.set(".text-container", { opacity: 0 });
      gsap.set(playChars, { opacity: 0 });
      gsap.set(axisLines, { width: "0%", height: "0%", scale: 0 });
      gsap.set(labels, { opacity: 0 });
      gsap.set(buttonWrapper, { opacity: 0 });
      gsap.set(document.querySelectorAll<HTMLElement>(".btn"), {
        opacity: 0,
        y: "-30px",
      });
    }
    function createAnimationTimeline2() {
      animationTimeline = gsap.timeline();

      animationTimeline.to(".text-container", {
        opacity: 1,
        duration: animationSettings.duration / 2,
        ease: animationSettings.ease,
      });

      animationTimeline.fromTo(
        playChars,
        { y: "1rem", opacity: 0 },
        {
          y: "0rem",
          opacity: 1,
          stagger: animationSettings.stagger,
          duration: animationSettings.duration,
          ease: animationSettings.ease,
        },
        0
      );
    }
    function createAnimationTimeline() {
      animationTimeline = gsap.timeline();

      animationTimeline.to(".text-container", {
        opacity: 1,
        duration: animationSettings.duration / 2,
        ease: animationSettings.ease,
      });

      animationTimeline.fromTo(
        playChars,
        { y: "1rem", opacity: 0 },
        {
          y: "0rem",
          opacity: 1,
          stagger: animationSettings.stagger,
          duration: animationSettings.duration,
          ease: animationSettings.ease,
        },
        0
      );

      animationTimeline.fromTo(
        axisLines,
        { width: "0%", height: "0%", scale: 1 },
        {
          width: (i) =>
            axisLines[i].classList.contains("horizontal") ? "100%" : "0%",
          height: (i) =>
            axisLines[i].classList.contains("vertical") ? "100%" : "0%",
          duration: animationSettings.duration * 2.5,
          ease: animationSettings.ease,
        },
        0
      );

      animationTimeline.fromTo(
        labels,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: animationSettings.stagger,
          duration: animationSettings.duration,
          ease: animationSettings.ease,
        },
        0.5
      );
      animationTimeline.fromTo(
        buttonWrapper,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: animationSettings.stagger,
          duration: animationSettings.duration,
          ease: animationSettings.ease,
        },
        0.9
      );

      animationTimeline.fromTo(
        document.querySelectorAll<HTMLElement>(".btn"),
        { y: "-30px", opacity: 0 },
        {
          y: "0rem",
          opacity: 1,
          stagger: animationSettings.stagger,
          duration: animationSettings.duration,
          ease: animationSettings.ease,
        },
        0.2
      );
    }

    function runAnimation() {
      if (animationTimeline) {
        animationTimeline.restart();
      } else {
        createAnimationTimeline();
      }
    }

    window.addEventListener("mousemove", updateText);

    changeFontButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const fontClass = (e.currentTarget as HTMLButtonElement).dataset.font;
        textContainer.className = `text-container ${fontClass}`;
        wrapper.className = `theme-${fontClass}`;
        applyFontVariation();
        runAnimation();
      });
    });
    avatarBtn.forEach((button) => {
      button.addEventListener("click", () => {
        createAnimationTimeline2();
      });
    });

    triggerAnimationButton?.addEventListener("click", runAnimation);

    setupInitialStates();
    runAnimation();

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", updateText);
      changeFontButtons.forEach((button) => {
        button.removeEventListener("click", runAnimation);
      });
      triggerAnimationButton?.removeEventListener("click", runAnimation);
    };
  }, []);

  return (
    <>
      <div id="wrapper" className="theme-font-sans">
        <div className="grid">
          <div className="axis-wrapper">
            <div className="axis-line horizontal"></div>
            <div className="axis-line vertical"></div>
          </div>
          <div className="label top font-mono">
            <Avatar hue={lastY} className="avatarBtn" />

            <div className="text-[#fef406] font-light opacity-50 mt-4 text-center sm:invisible">
              <span>
                ALPHA:{" "}
                {orientation.alpha !== null
                  ? orientation.alpha.toFixed(2)
                  : "N/A"}
              </span>
              <span>
                {" ✦ "}BETA:{" "}
                {orientation.beta !== null
                  ? orientation.beta.toFixed(2)
                  : "N/A"}
              </span>
              <span>
                {" ✦ "}GAMMA:{" "}
                {orientation.gamma !== null
                  ? orientation.gamma.toFixed(2)
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="label bottom font-mono">
            <SpecialDays />
            {/* <CopyMailAddress /> */}
          </div>
          <div className="label top font-mono"></div>
        </div>

        <div className="frame">
          <div className="text-container font-sans" id="text">
            <div className="fatih thisAnimate">
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">K</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">A</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">A</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">N</span>
                </span>
              </span>
            </div>
            <div>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  {/* <span className="char"> — </span> */}
                  <span className="char"></span>
                </span>
              </span>
            </div>
            <div className="egriboz thisAnimate">
              {/* <span className="char-wrapper offset"></span> */}
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">E</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">Ğ</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">R</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">İ</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">B</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">O</span>
                </span>
              </span>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">Z</span>
                </span>
              </span>
            </div>
            <div>
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  {/* <span className="char"> — </span> */}
                  <span className="char"></span>
                </span>
              </span>
            </div>
            <div className="frontend-text">
              <span className="char-wrapper">
                <span className="char-inner-wrapper">
                  <span className="char">JR. RUNNER</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="action-panel">
          <div className="button-wrapper align-left">
            <SpotifyCurrentlyPlaying />
          </div>

          <div className="button-wrapper align-right">
            <Socials />
            <button className="btn js-trigger-animation font-mono"></button>
            <a
              className="btn js-change-font font-mono"
              data-font="font-serif"
            ></a>
            <a
              className="btn js-change-font font-mono"
              data-font="font-sans"
            ></a>
          </div>
        </div>
        <div className="noise"></div>
      </div>
    </>
  );
};

export default HomePage;
