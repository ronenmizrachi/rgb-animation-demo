// ImageEffectOne.jsx
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ImageEffectOne.css";

const ImageEffectOne = forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.4, y: 100, x: 0 },
        {
          scale: 1.1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          ease: "none",
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 100, x: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    restartAnimation: () => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    },
  }));

  return (
    <section ref={sectionRef} className="image-effect-one-section">
      <div className="image-container">
        <img
          ref={imageRef}
          src="/images/news8.jpg"
          alt="Effect"
          className="image-effect"
        />
      </div>
      <p className="image-caption">
        This is a caption. You can style and align me freely.
      </p>
    </section>
  );
});

export default ImageEffectOne;
