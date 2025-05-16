// VariableTypeLoop.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./VariableTypeLoop.css";

export default function VariableTypeLoop() {
  const textRef = useRef(null);

  const keyframes = [
    {
      size: "clamp(6rem, 4vw, 12rem)",
      wght: 300,
      wdth: 80,
      color: "#333",
      text: "Responsive Typography",
      duration: 2.2,
      pause: 1.2,
    },
    {
      size: "clamp(1rem, 6vw, 1rem)",
      wght: 700,
      wdth: 100,
      color: "#d40000",
      text: "Responsive Typography",
      duration: 3.5,
      pause: 2.0,
    },
    {
      size: "clamp(8rem, 5vw, 12rem)",
      wght: 500,
      wdth: 60,
      color: "#0077cc",
      text: "Variable Fonts FTW",
      duration: 5.5,
      pause: 1.8,
    },
    {
      size: "clamp(8rem, 7vw, 10rem)",
      wght: 900,
      wdth: 50,
      color: "rgba(0, 0, 0, 0.00)",
      text: "Bold Expression",
      duration: 6.8,
      pause: 1.5,
    },
  ];

  useEffect(() => {
    const el = textRef.current;
    let index = 0;

    const animate = () => {
      const {
        size,
        wght,
        wdth,
        color,
        text,
        pause = 1,
        duration = 2.2,
      } = keyframes[index];

      gsap.to(el, {
        fontSize: size,
        fontVariationSettings: `'wght' ${wght}, 'wdth' ${wdth}`,
        color: color,
        duration: duration,
        ease: "sine.inOut",
        onStart: () => {
          el.textContent = text;
        },
        onComplete: () => {
          index = (index + 1) % keyframes.length;
          gsap.delayedCall(pause, animate);
        },
      });
    };

    animate();
  }, []);

  return (
    <div className="variable-type-loop">
      <h1 ref={textRef}>Responsive Typography</h1>
    </div>
  );
}
