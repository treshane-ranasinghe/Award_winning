import { useState, useEffect } from "react";

const Hero = () => {
  const totalVideos = 4;
  const [backgroundIndex, setBackgroundIndex] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [showBox, setShowBox] = useState(false);

  // Preload all videos
  useEffect(() => {
    for (let i = 1; i <= totalVideos; i++) {
      const vid = document.createElement("video");
      vid.src = `/videos/hero-${i}.mp4`;
      vid.preload = "auto";
    }
  }, []);

  // Handle click to switch background
  const handleVideoClick = () => {
    setOpacity(0); // fade out
    setTimeout(() => {
      setBackgroundIndex(currentIndex);
      setOpacity(1); // fade in
      setCurrentIndex((prev) =>
        prev >= totalVideos ? 1 : prev + 1
      );
    }, 400);
  };

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-black"
      onMouseEnter={() => setShowBox(true)}
      onMouseLeave={() => setShowBox(false)}
    >
      {/* Background video */}
      <video
        key={backgroundIndex}
        src={getVideoSrc(backgroundIndex)}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
      

        {/* Center hover box */}
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            showBox ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <div
            className="cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            onClick={handleVideoClick}
          >
            <video
              key={currentIndex}
              src={getVideoSrc(currentIndex)}
              autoPlay
              loop
              muted
              playsInline
              className="w-[600px] h-[340px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
