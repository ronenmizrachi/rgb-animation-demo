// FeatureArticle.jsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import "./FeatureArticle.css";

const FeatureArticle = forwardRef((props, ref) => {
  const headlineRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const flareRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.fromTo(headlineRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1 },
        "-=0.6"
      )
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      );

    animationRef.current = tl;
  }, []);

  useImperativeHandle(ref, () => ({
    restartAnimation: () => {
      animationRef.current?.restart();
    },
  }));

  const handleHoverIn = () => {
    gsap.fromTo(
      flareRef.current,
      { scale: 0, opacity: 0.4 },
      {
        scale: 3.5,
        opacity: 0,
        duration: 3,
        ease: "power3.out",
      }
    );

    gsap.to(buttonRef.current, {
      scale: 1.05,
      backgroundColor: "#a80000",
      boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
      duration: 2,
      ease: "power2.out",
    });
  };

  const handleHoverOut = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      backgroundColor: "var(--color-accent)",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  const handleClick = () => {
    animationRef.current.restart();
  };

  return (
    <section className="feature-article">
      <div className="text">
        <h1 ref={headlineRef}>Exclusive: Inside the Climate Report</h1>
        <p ref={textRef}>
          A deep-dive into the latest findings of the UN’s climate task force,
          including new data, global reactions, and what it means for the
          future.
        </p>
        <button
          ref={buttonRef}
          className="fancy-gsap-button"
          onMouseEnter={handleHoverIn}
          onMouseLeave={handleHoverOut}
          onClick={handleClick}
        >
          <span className="flare" ref={flareRef}></span>
          <span className="label">Replay</span>
        </button>
      </div>
      <div className="image">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Climate Report"
        />
      </div>
    </section>
  );
});

export default FeatureArticle;
