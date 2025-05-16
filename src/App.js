// App.js
import "./styles.css";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import FeatureArticle from "./components/FeatureArticle";
import TickerSection from "./components/TickerSection";
import QuoteFeature from "./components/QuoteFeature";
import VariableTypeLoop from "./components/VariableTypeLoop";
import StoryTemplate from "./components/StoryTemplate";
import RowItems from "./components/RowItems";
import SectionWrapper from "./components/SectionWrapper";
import ImageEffectOne from "./components/ImageEffectOne"; // ✅ חדש

export default function App() {
  const featureRef = useRef();
  const tickerRef = useRef();
  const quoteRef = useRef();
  const variableRef = useRef();
  const storyRef = useRef();
  const rowRef = useRef();
  const imageEffectRef = useRef(); // ✅ חדש

  useEffect(() => {
    requestAnimationFrame(() => {
      const sections = gsap.utils.toArray(".section-wrapper");
      sections.forEach((section, index) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 150 },
          {
            opacity: 1,
            y: 0,
            duration: 2.5,
            ease: "expo.out",
            delay: index * 1.5,
          }
        );
      });
    });
  }, []);

  return (
    <div className="App">
      <SectionWrapper
        id="feature"
        background="linear-gradient(180deg, #F8EA97 0%, #A9E6AB 100%)"
        onReload={() => featureRef.current?.restartAnimation()}
        ctaText="Feature"
      >
        <FeatureArticle ref={featureRef} />
      </SectionWrapper>

      <SectionWrapper
        id="ticker"
        background="linear-gradient(180deg, #FF8265 0%, #FF6363 100%)"
        onReload={() => tickerRef.current?.restartAnimation()}
        ctaText="Ticker"
      >
        <TickerSection ref={tickerRef} />
      </SectionWrapper>

      <SectionWrapper
        id="quote"
        background="linear-gradient(180deg, #FEF2DF 0%, #E6E3DA 100%)"
        onReload={() => quoteRef.current?.restartAnimation()}
        ctaText="Quote"
      >
        <QuoteFeature ref={quoteRef} />
      </SectionWrapper>

      <SectionWrapper
        id="variable"
        background="linear-gradient(180deg, #9165FF 0%, #96FFFB 100%)"
        onReload={() => variableRef.current?.restartAnimation()}
        ctaText="Variable Loop"
      >
        <VariableTypeLoop ref={variableRef} />
      </SectionWrapper>

      <SectionWrapper
        id="story"
        background="#fff"
        onReload={() => storyRef.current?.restartAnimation()}
        ctaText="Story Template"
      >
        <StoryTemplate ref={storyRef} />
      </SectionWrapper>

      <SectionWrapper
        id="row"
        background="linear-gradient(180deg, #F6F7F8 0%, #EDEEF1 100%)"
        onReload={() => rowRef.current?.restartAnimation()}
        ctaText="Row Items"
      >
        <RowItems ref={rowRef} />
      </SectionWrapper>

      {/* ✅ קומפוננטת ImageEffectOne החדשה */}
      <SectionWrapper
        id="imageeffect"
        background="black"
        onReload={() => imageEffectRef.current?.restartAnimation()}
        ctaText="Image Effect One"
      >
        <ImageEffectOne ref={imageEffectRef} />
      </SectionWrapper>

      <div style={{ height: "100vh", background: "#fafafa" }}></div>
    </div>
  );
}
