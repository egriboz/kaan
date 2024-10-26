import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

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

const SpotifyCurrentlyPlaying: React.FC = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isToggled, setIsToggled] = useState(false); // Başlangıç durumu false

  // Butona tıklandığında sınıf ekleyip/çıkaran fonksiyon
  const toggleClass = () => {
    setIsToggled((prevState) => !prevState); // Önceki duruma göre tersine çevir
  };
  /*
  useEffect(() => {
    // Local storage'dan son dinlenen parçayı al
    const storedLastTrack = localStorage.getItem("lastTrack");
    if (storedLastTrack) {
      setTrack(JSON.parse(storedLastTrack));
    }
  }, []);
  */

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
          // Local storage'a kaydet
          /*
          localStorage.setItem("lastTrack", JSON.stringify(response.data.item));
          */
        } else {
          // Eğer şu an çalan parça yoksa, son dinlenen parçayı local storage'dan al
          /*
          const storedLastTrack = localStorage.getItem("lastTrack");
          if (storedLastTrack) {
            setTrack(JSON.parse(storedLastTrack));
          }
          */
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

  // Eğer track yoksa yükleniyor mesajı gösterebilirsiniz
  if (!track) {
    return (
      <>
        <div className="flex items-center">
          <div className="relative">
            <img
              className="rounded-[8px] object-cover"
              width={32}
              height={32}
              src="/spotifyy_light.webp"
              alt="Loading..."
            />

            <div className="absolute inset-0 rounded-full shadow-inner"></div>
          </div>
          <div className="ml-2 block" style={{ width: "200px" }}>
            <div>
              <span className="font-bold text-[#ffffff] text-[0.75rem]">
                NOT PLAYING{"!"}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  const albumImage = track.album.images[0]?.url; // İlk resmi al

  return (
    <>
      {albumImage && (
        <img
          // className={`z-0 transition duration-700 ease-in-out default-spotify-img ${
          //   isToggled ? "hover-spotify-img" : ""
          // }`}
          className={`z-0 transition duration-700 ease-in-out default-spotify-img ${
            isPlaying
              ? "hover-spotify-img"
              : isToggled
              ? "hover-spotify-img"
              : ""
          }`}
          // className="object-cover hover-spotify-img transition-all relative z-50"
          // className="object-cover hover-spotify-img"
          src={albumImage}
          alt={`${track.name} Album Cover`}
        />
      )}
      <div className="flex items-center relative z-10">
        <div className="relative" onClick={toggleClass}>
          {albumImage && (
            <img
              className="rounded-[8px] object-cover"
              width={32}
              height={32}
              src={albumImage}
              alt={`${track.name} Album Cover`}
            />
          )}
          <div
            className={`absolute inset-0 rounded-full text-white h-64 text-center shadow-inner ${
              !isPlaying ? "cursor-zoom-in" : ""
            }`}
          >
            ...
          </div>
        </div>
        <div className="ml-2 block" style={{ width: "200px" }}>
          <div>
            {isPlaying ? (
              <>
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-light text-white text-sm hover:no-underline"
                >
                  <span className="font-bold text-[#39ff14] text-[0.75rem] rounded-full transition-all hover:p-1 ">
                    NOW PLAYING {" >"}
                  </span>
                </a>
              </>
            ) : (
              <span className="font-bold text-[#ffffff] text-[0.75rem]">
                LAST LISTENED
                {/* {" ⤵"} */}
              </span>
            )}
          </div>
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Marquee speed={30}>
              <h4 className="font-light text-[#daf6ff] text-sm">
                <span>{" ✦ "} </span>
                <span>{track.name}</span>
                <span>{" ✦ "} </span>
                <span className="text-[#ffd700]">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </span>
                <span>{" ✦ "} </span>
                <span>{track.album.name}</span>
              </h4>
            </Marquee>
          </a>
          {/* <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="font-light text-white text-sm hover:underline"
        >
          Listen on Spotify
        </a> */}
        </div>
      </div>
    </>
  );
};

export default SpotifyCurrentlyPlaying;
