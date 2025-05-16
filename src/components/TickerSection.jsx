// TickerSection.jsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import "./TickerSection.css";

const TickerSection = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const tlRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.out" },
    });

    tl.fromTo(
      itemsRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.15 }
    );

    tlRef.current = tl;
  }, []);

  useImperativeHandle(ref, () => ({
    restartAnimation: () => {
      tlRef.current?.restart();
    },
  }));

  const sampleData = [
    {
      image: "/images/news1.jpg",
      time: "5 minutes ago",
      headline:
        "Breaking: Major Policy Shift Announced by Government Officials",
    },
    {
      image: "/images/news2.jpg",
      time: "8 minutes ago",
      headline: "Confirmed: Key Resignation Rocks Political Landscape",
    },
    {
      image: "/images/news3.jpg",
      time: "10 minutes ago",
      headline: "Urgent: Global Markets React to Unexpected Economic Report",
    },
    {
      image: "/images/news4.jpg",
      time: "12 minutes ago",
      headline: "Alert: Severe Weather System Approaching the Coastline",
    },
    {
      image: "/images/news5.jpg",
      time: "15 minutes ago",
      headline: "Update: Tech Giant Faces Backlash After Security Breach",
    },
    {
      image: "/images/news6.jpg",
      time: "18 minutes ago",
      headline: "Live: Emergency Services Deployed Following Explosion Reports",
    },
    {
      image: "/images/news7.jpg",
      time: "20 minutes ago",
      headline: "Flash: Disruption in Global Supply Chains Sparks Concern",
    },
  ];

  return (
    <div className="ticker-section" ref={containerRef}>
      <div className="ticker-items">
        {sampleData.map((item, index) => (
          <div
            key={index}
            className="ticker-item"
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <img src={item.image} alt="thumb" className="ticker-thumb" />
            <div className="ticker-meta">
              <span className="ticker-time">{item.time}</span>
              <h3 className="ticker-headline">{item.headline}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TickerSection;
