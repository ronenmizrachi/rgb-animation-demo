// QuoteFeature.jsx
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./QuoteFeature.css";

gsap.registerPlugin(ScrollTrigger);

const QuoteFeature = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const wordsRef = useRef([]);
  const tlRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      imageRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
    );

    tl.fromTo(
      wordsRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)",
      },
      "+=0.5"
    );

    tlRef.current = tl;
  }, []);

  useImperativeHandle(ref, () => ({
    restartAnimation: () => {
      tlRef.current?.restart();
    },
  }));

  const quote = `"Back when I was lost stumbling around, You found me now I can see, My feet won't touch the ground, Fighting through the pain"`;
  const words = quote.split(" ");

  return (
    <div className="quote-feature" ref={containerRef}>
      <div className="quote-image">
        <img src="/images/romello.jpg" alt="Fred" ref={imageRef} />
      </div>
      <div className="quote-text">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            className="quote-word"
          >
            {word}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
});

export default QuoteFeature;
