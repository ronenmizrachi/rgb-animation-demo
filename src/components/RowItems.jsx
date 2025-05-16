// RowItems.jsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RowItems.css";

gsap.registerPlugin(ScrollTrigger);

const RowItems = forwardRef((_, ref) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useImperativeHandle(ref, () => ({
    restartAnimation: () => {
      animation();
    },
  }));

  const items = [
    {
      image: "/images/news1.jpg",
      label: "Politics",
      title: "Major Reform Passed",
      text: "Read the full update",
    },
    {
      image: "/images/news2.jpg",
      label: "Health",
      title: "New Vaccine Released",
      text: "Discover details",
    },
    {
      image: "/images/news3.jpg",
      label: "Tech",
      title: "AI Breakthrough Announced",
      text: "Explore now",
    },
  ];

  useEffect(() => {
    animation();
  }, []);

  const animation = () => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    gsap.set(cardsRef.current, { opacity: 0, yPercent: 200 });

    ScrollTrigger.batch(cardsRef.current, {
      start: "top 80%",
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          yPercent: 0,
          duration: 0.6,
          stagger: {
            each: 0.15,
            from: "center",
          },
          ease: "expo.out",
        });
      },
    });
  };

  return (
    <div className="row-items" ref={containerRef}>
      {items.map((item, index) => (
        <div
          key={index}
          className="row-card"
          ref={(el) => (cardsRef.current[index] = el)}
        >
          <div className="row-image-wrapper">
            <img
              src={item.image}
              alt="thumb"
              className="row-image scroll-zoom"
            />
          </div>
          <span className="row-label">{item.label}</span>
          <h3 className="row-title">{item.title}</h3>
          <p className="row-text">{item.text}</p>
        </div>
      ))}
    </div>
  );
});

export default RowItems;
