// StoryTemplate.jsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StoryTemplate.css";

gsap.registerPlugin(ScrollTrigger);

const StoryTemplate = forwardRef((_, ref) => {
  const textRef = useRef(null);
  const backgroundRef = useRef(null);
  const textTlRef = useRef(null);
  const bgTlRef = useRef(null);
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    restartAnimation: () => {
      textTlRef.current?.kill();
      bgTlRef.current?.kill();
      animateText();
      animateBackground();
    },
  }));

  const textFrames = [
    {
      text: "This is a story.",
      size: "clamp(2rem, 5vw, 4rem)",
      wght: 300,
      wdth: 80,
      color: "#ffffff",
      duration: 4,
      pause: 1.2,
    },
    {
      text: "With dynamic visuals",
      size: "clamp(2rem, 6vw, 5rem)",
      wght: 700,
      wdth: 100,
      color: "#fff",
      duration: 6,
      pause: 1.5,
    },
    {
      text: "And even background video",
      size: "clamp(3rem, 7vw, 6rem)",
      wght: 500,
      wdth: 60,
      color: "#fff",
      duration: 5,
      pause: 2,
    },
  ];

  const bgFrames = [
    /*{ background: "#48345A", duration: 3, pause: 1.2 },
    { background: "#961F6C", duration: 3, pause: 1.2 },
    { background: "#48345A", duration: 3, pause: 1.2 },
    { background: "url(/images/news1.jpg)", duration: 1, pause: 1.5 },*/
    { background: "#961F6C", duration: 3, pause: 1.2 },
    { background: "/images/short.mp4", duration: 20, pause: 1.2 },
    { background: "#961F6C", duration: 3, pause: 1.2 },
  ];

  useEffect(() => {
    gsap.set(containerRef.current, { opacity: 0, y: 80 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      once: true,
      onEnter: () => {
        gsap.to(containerRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        });
        animateText();
        animateBackground();
      },
    });
  }, []);

  const animateText = () => {
    const el = textRef.current;
    let index = 0;

    const run = () => {
      const {
        size = "clamp(2rem, 4vw, 3rem)",
        wght = 400,
        wdth = 100,
        color = "#000",
        text = "...",
        pause = 1,
        duration = 2,
      } = textFrames[index];

      if (text) el.textContent = text;

      gsap.to(el, {
        fontSize: size,
        fontVariationSettings: `'wght' ${wght}, 'wdth' ${wdth}`,
        color,
        duration,
        ease: "sine.inOut",
        onComplete: () => {
          index = (index + 1) % textFrames.length;
          gsap.delayedCall(pause, run);
        },
      });
    };

    run();
  };

  const animateBackground = () => {
    const bg = backgroundRef.current;
    let index = 0;

    const run = () => {
      const { background, pause = 1, duration = 0.5 } = bgFrames[index];

      if (background) {
        gsap.to(bg, {
          opacity: 0.9,
          duration: 3,
          onComplete: () => {
            if (
              background.startsWith("url") ||
              background.startsWith("linear") ||
              background.startsWith("#")
            ) {
              bg.style.background = background;
              bg.innerHTML = "";
            } else if (background.endsWith(".mp4")) {
              const video = document.createElement("video");
              video.src = background;
              video.autoplay = true;
              video.muted = true;
              video.loop = true;
              video.playsInline = true;
              bg.innerHTML = "";
              bg.appendChild(video);
            } else if (
              background.endsWith(".jpg") ||
              background.endsWith(".png")
            ) {
              bg.style.background = `url(${background}) center/cover no-repeat`;
              bg.innerHTML = "";
            }
            gsap.to(bg, {
              opacity: 1,
              duration,
              ease: "power2.out",
              onComplete: () => {
                index = (index + 1) % bgFrames.length;
                gsap.delayedCall(pause, run);
              },
            });
          },
        });
      }
    };

    run();
  };

  return (
    <div className="story-template" ref={containerRef}>
      <div className="story-background" ref={backgroundRef}></div>
      <h1 ref={textRef}>Loading Story...</h1>
    </div>
  );
});

export default StoryTemplate;
