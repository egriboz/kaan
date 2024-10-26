import React from "react";
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
interface CurrentlyPlayingProps {
  track: Track;
  isPlaying: boolean;
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
  track,
  isPlaying,
}) => {
  const albumImage = track.album.images[0]?.url; // İlk resmi al

  return (
    <>
      <div className="flex items-center">
        <div className="relative">
          {albumImage && (
            <img
              className="rounded-full object-cover"
              width={64}
              height={64}
              src={albumImage}
              alt={`${track.name} Album Cover`}
            />
          )}
          <div className="absolute inset-0 rounded-full shadow-inner"></div>
        </div>
        <div className="ml-4 block">
          <p>{isPlaying && <em>Now Playing...</em>}</p>
          <Marquee
            gradient={true}
            gradientColor="rgba(255, 255, 255, 1)"
            gradientWidth={20}
            speed={30}
          >
            <h4>
              <span>{track.name}</span>
              <span>{" ✦ "}</span>
              <span className="text-red-500">
                {track.artists.map((artist) => artist.name).join(", ")}
              </span>
              <span>{" ✦ "}</span>
              <span>{track.album.name}</span>
              <span>{" ✦ "}</span>
              <span>{track.name}</span>
              <span>{" ✦ "}</span>
              <span className="text-red-500">
                {track.artists.map((artist) => artist.name).join(", ")}
              </span>
              <span>{" ✦ "}</span>
              <span>{track.album.name}</span>
            </h4>
          </Marquee>
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 block"
          >
            Listen on Spotify
          </a>
        </div>
      </div>
      {/* ... */}

      {/* ... */}
    </>
  );
};

export default CurrentlyPlaying;
