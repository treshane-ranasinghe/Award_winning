import { useRef, useState, useEffect } from "react";

const Hero = () => {
  const totalVideos = 4;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [opacity, setOpacity] = useState(1); // for fade effect

  const videoRef = useRef(null);

  // Preload all videos to reduce flicker
  useEffect(() => {
    for (let i = 1; i <= totalVideos; i++) {
      const vid = document.createElement("video");
      vid.src = `/videos/hero-${i}.mp4`;
      vid.preload = "auto";
    }
  }, []);

  const handleVideoLoad = () => setLoadedVideos((prev) => prev + 1);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    // Fade out first
    setOpacity(0);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= totalVideos ? 1 : prevIndex + 1));
      setOpacity(1); // Fade in
    }, 300); // 300ms fade duration
  };

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-screen w-screen overflow-x-hidden flex items-center justify-center bg-blue-100">
      <div
        id="video-frame"
        className="relative z-10 h-[80vh] w-[90vw] overflow-hidden rounded-lg flex items-center justify-center"
      >
        <div
          className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-500 ease-in hover:scale-105"
          onClick={handleMiniVdClick}
        >
          <video
            ref={videoRef}
            key={currentIndex} // ensures React reloads video on change
            src={getVideoSrc(currentIndex)}
            loop
            muted
            autoPlay
            playsInline
            onLoadedData={handleVideoLoad}
            className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
            style={{ opacity: opacity }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
