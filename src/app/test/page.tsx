"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrentlyPlaying from "@components/CurrentlyPlaying";
import Socials from "@components/Socials";
import CopyMailAddress from "@components/CopyMailAddress";

import gsap from "gsap";
interface Artist {
  name: string;
}

interface Album {
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}

interface Track {
  name: string;
  artists: Artist[];
  album: Album;
  external_urls: {
    spotify: string;
  };
}

export default function Home() {
  const [track, setTrack] = useState<Track | null>(null);
  const [lastTrack, setLastTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Local storage'dan son dinlenen parçayı al
    const storedLastTrack = localStorage.getItem("lastTrack");
    if (storedLastTrack) {
      setLastTrack(JSON.parse(storedLastTrack));
    }
  }, []);

  useEffect(() => {
    const getCurrentlyPlayingTrack = async () => {
      const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

      try {
        const response = await axios.get(`/api/spotify`, {
          params: { refreshToken },
        });

        console.log("Currently Playing Track:", response.data);

        if (response.data.item) {
          // Şu an çalan parça varsa
          setTrack(response.data.item);
          setIsPlaying(response.data.is_playing);
          setLastTrack(response.data.item); // Son dinlenen parça
          // Local storage'a kaydet
          localStorage.setItem("lastTrack", JSON.stringify(response.data.item));
        } else {
          // Eğer şu an çalan parça yoksa, son dinlenen parçayı local storage'dan al
          const storedLastTrack = localStorage.getItem("lastTrack");
          if (storedLastTrack) {
            setLastTrack(JSON.parse(storedLastTrack));
          }
          setIsPlaying(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching currently playing track:",
            error.response?.data || error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    getCurrentlyPlayingTrack();
  }, []);
  // const [track, setTrack] = useState<Track | null>(null);
  // const [lastTrack, setLastTrack] = useState<Track | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   const getCurrentlyPlayingTrack = async () => {
  //     const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  //     try {
  //       const response = await axios.get(`/api/spotify`, {
  //         params: { refreshToken },
  //       });

  //       console.log("Currently Playing Track:", response.data);

  //       if (response.data.item) {
  //         // Şu an çalan parça varsa
  //         setTrack(response.data.item);
  //         setIsPlaying(response.data.is_playing);
  //         setLastTrack(response.data.item); // Son dinlenen parça
  //       } else {
  //         // Eğer şu an çalan parça yoksa son dinlenen parçayı göster
  //         setIsPlaying(false);
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error(
  //           "Error fetching currently playing track:",
  //           error.response?.data || error.message
  //         );
  //       } else {
  //         console.error("Unexpected error:", error);
  //       }
  //     }
  //   };

  //   getCurrentlyPlayingTrack();
  // }, []);
  // ---**********--------*****------******-----
  // useEffect(() => {
  //   const getCurrentlyPlayingTrack = async () => {
  //     const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  //     try {
  //       const response = await axios.get(`/api/spotify`, {
  //         params: { refreshToken },
  //       });

  //       console.log("Currently Playing Track:", response.data);
  //       setTrack(response.data.item);
  //       setIsPlaying(response.data.is_playing);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error(
  //           "Error fetching currently playing track:",
  //           error.response?.data || error.message
  //         );
  //       } else {
  //         console.error("Unexpected error:", error);
  //       }
  //     }
  //   };

  //   getCurrentlyPlayingTrack();
  // }, []);

  useEffect(() => {
    gsap.defaults({ ease: "elastic(1, 0.2)" });

    const svgHorizontal = document.querySelector(
      "#horizontal"
    ) as SVGSVGElement;
    const pathHorizontal = document.querySelector("#hpath") as SVGPathElement;
    const svgVertical = document.querySelector("#vertical") as SVGSVGElement;
    const pathVertical = document.querySelector("#vpath") as SVGPathElement;

    let connectedHorizontal = false;
    let connectedVertical = false;
    const snapDist = 40;
    const startY = 60;
    const startX = 100;

    const ph0 = { x: 0, y: startY };
    const ph1 = { x: svgHorizontal?.clientWidth / 2 || 0, y: startY };
    const ph2 = { x: svgHorizontal?.clientWidth || 0, y: startY };

    const pv0 = { x: startX, y: 0 };
    const pv1 = { x: startX, y: svgVertical?.clientHeight / 2 || 0 };
    const pv2 = { x: startX, y: svgVertical?.clientHeight || 0 };

    svgHorizontal?.addEventListener("mousemove", onMoveHorizontal);
    svgVertical?.addEventListener("mousemove", onMoveVertical);
    window.addEventListener("resize", updatePathOnResize);

    gsap.ticker.add(updateHorizontal);
    gsap.ticker.add(updateVertical);

    updateHorizontal();
    updateVertical();

    function updateHorizontal() {
      const d = `M${ph0.x},${ph0.y} Q${ph1.x},${ph1.y} ${ph2.x},${ph2.y}`;
      if (pathHorizontal) {
        pathHorizontal.setAttribute("d", d);
      }
      if (Math.abs(ph1.y - startY) > snapDist) {
        connectedHorizontal = false;
        gsap.to(ph1, { duration: 1, y: startY });
      }
    }

    function updateVertical() {
      const d = `M${pv0.x},${pv0.y} Q${pv1.x},${pv1.y} ${pv2.x},${pv2.y}`;
      if (pathVertical) {
        pathVertical.setAttribute("d", d);
      }
      if (Math.abs(pv1.x - startX) > snapDist) {
        connectedVertical = false;
        gsap.to(pv1, { duration: 1, x: startX });
      }
    }

    function updatePathOnResize() {
      const svgHorizontalWidth = svgHorizontal?.clientWidth || 0;
      const svgVerticalHeight = svgVertical?.clientHeight || 0;

      ph0.x = 0;
      ph1.x = svgHorizontalWidth / 2;
      ph2.x = svgHorizontalWidth;

      pv0.y = 0;
      pv1.y = svgVerticalHeight / 2;
      pv2.y = svgVerticalHeight;

      updateHorizontal();
      updateVertical();
    }

    function onMoveHorizontal(event: MouseEvent) {
      const svgRect = svgHorizontal?.getBoundingClientRect();
      if (!svgRect) return;

      const mouseY = event.clientY - svgRect.top;

      if (!connectedHorizontal && event.target === pathHorizontal) {
        connectedHorizontal = true;
        gsap.killTweensOf(ph1);

        // Renk değiştirme animasyonu
        gsap.to(pathHorizontal, {
          duration: 2,
          stroke: "#000", // Yeni renk
          onComplete: () => {
            // Eski renge dönüş
            gsap.to(pathHorizontal, {
              duration: 2,
              stroke: "#000", // Eski renk
            });
          },
        });
      }

      if (connectedHorizontal) {
        ph1.y = mouseY;
      }
    }

    // Dikey çizgi için mouse hareketine tepki veren fonksiyon
    function onMoveVertical(event: MouseEvent) {
      const svgRect = svgVertical?.getBoundingClientRect();
      if (!svgRect) return;

      const mouseX = event.clientX - svgRect.left;

      if (!connectedVertical && event.target === pathVertical) {
        connectedVertical = true;
        gsap.killTweensOf(pv1);

        // Renk değiştirme animasyonu
        gsap.to(pathVertical, {
          duration: 2,
          stroke: "#000", // Yeni renk
          onComplete: () => {
            // Eski renge dönüş
            gsap.to(pathVertical, {
              duration: 2,
              stroke: "#000", // Eski renk
            });
          },
        });
      }

      if (connectedVertical) {
        pv1.x = mouseX;
      }
    }

    return () => {
      svgHorizontal?.removeEventListener("mousemove", onMoveHorizontal);
      svgVertical?.removeEventListener("mousemove", onMoveVertical);
      gsap.ticker.remove(updateHorizontal);
      gsap.ticker.remove(updateVertical);
      window.removeEventListener("resize", updatePathOnResize);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-4/6 w-full relative p-6 items-center justify-center flex">
          {/* <h1>F / E</h1> */}

          {/* <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Spotify Çalan Parça</h1>
            {currentTrack ? (
              <CurrentlyPlaying track={currentTrack} isPlaying={isPlaying} />
            ) : (
              <p>Şu an çalan bir parça yok.</p>
            )}
          </div> */}
          {/* <div className="CurrentlyPlaying">
            {track ? (
              <CurrentlyPlaying track={track} isPlaying={isPlaying} />
            ) : (
              <p>Not listening to music right now!</p>
            )}
          </div> */}
          <div className="CurrentlyPlaying">
            {track ? (
              <CurrentlyPlaying track={track} isPlaying={isPlaying} />
            ) : lastTrack ? (
              <CurrentlyPlaying track={lastTrack} isPlaying={false} />
            ) : (
              <p>Not listening to music right now!</p>
            )}
          </div>
          <picture>
            <img src="https://egriboz.com/raven.gif" alt="" />
          </picture>
          <div
            style={{
              position: "absolute",
              right: "-100px",
              top: "0",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <svg id="vertical" width="200" height="100%">
              <path
                id="vpath"
                d="M100,0 Q100,100 100,2600"
                fill="transparent"
                stroke="black"
                strokeWidth="5"
              />
            </svg>
          </div>
        </div>
        <div className="md:w-2/6 w-full flex flex-col">
          <div className="flex-[8] p-6">
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src="https://pbs.twimg.com/profile_images/1646060508645031942/uIutGjFO_400x400.jpg"
                  alt="egriboz"
                />
                <div className="absolute inset-0 rounded-full shadow-inner"></div>
              </div>
              <div className="ml-4 block">
                <h2 className="font-bold text-gray-800 text-lg">
                  Fatih Eğriboz
                </h2>
                <p className="text-gray-600 font-[400]">
                  Frontend/UI Developer
                </p>
              </div>
            </div>

            <p className="pb-10">...</p>

            {/* <button className="group relative">
              <div className="relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-active:translate-x-0 group-active:translate-y-0">
                Say Hello!
              </div>
              <div className="absolute inset-0 z-0 h-full w-full rounded-md transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:[box-shadow:5px_5px_#a3a3a3,10px_10px_#d4d4d4,15px_15px_#e5e5e5] group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none"></div>
            </button> */}

            <CopyMailAddress />
          </div>

          <div className="flex-[2] relative">
            <div
              style={{
                textAlign: "center",
                transform: "translateY(-60px)",
                position: "relative",
                zIndex: "2",
              }}
            >
              <svg id="horizontal" width="100%" height="120">
                <path
                  id="hpath"
                  d="M0,60 Q 400,60 1800,60"
                  fill="transparent"
                  stroke="black"
                  strokeWidth="5"
                />
              </svg>
            </div>
            <div className="absolute z-0 p-6 top-0 w-full h-full">
              <Socials />
              {/* <div className="flex items-center">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src="https://pbs.twimg.com/profile_images/1646060508645031942/uIutGjFO_400x400.jpg"
                    alt="egriboz"
                  />
                  <div className="absolute inset-0 rounded-full shadow-inner"></div>
                </div>
                <div className="ml-4 block">
                  <h2 className="font-bold text-gray-800 text-lg">
                    Fatih Eğriboz
                  </h2>
                  <p className="text-gray-600 font-[400]">
                    Frontend/UI Developer
                  </p>
                </div>
              </div> */}
              {/* ... */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
