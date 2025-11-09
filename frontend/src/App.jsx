import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

import ThemeCard from "./components/ThemeCard";
import TopicDisplay from "./components/TopicDisplay";
import RollButton from "./components/RollButton";

import styles from "./styles/App.module.css";

const themes = [
  { name: "恋愛", icon: "❤️" },
  { name: "仕事", icon: "💼" },
  { name: "プライベート", icon: "🏖️" },
];

function App() {
  const [theme, setTheme] = useState(themes[0].name);
  const [topic, setTopic] = useState(null);
  const [displayTopic, setDisplayTopic] = useState(
    "「▶️次の話題」を押してください"
  );
  const [rolling, setRolling] = useState(false);
  const [topicsCache, setTopicsCache] = useState([]);
  const topicAreaRef = useRef(null);

  const fireConfetti = () => {
    const topicRect = topicAreaRef.current?.getBoundingClientRect();
    if (!topicRect) return;

    const leftX = topicRect.left / window.innerWidth;
    const rightX = topicRect.right / window.innerWidth;
    const yCenter = (topicRect.top + topicRect.bottom) / 2 / window.innerHeight;

    const duration = 700;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        startVelocity: 40,
        spread: 60,
        angle: 60,
        origin: { x: leftX, y: yCenter },
        colors: ["#ff6f61", "#ffd166", "#06d6a0", "#118ab2", "#ef476f"],
        ticks: 100,
        scalar: 0.9,
      });
      confetti({
        particleCount: 3,
        startVelocity: 40,
        spread: 60,
        angle: 120,
        origin: { x: rightX, y: yCenter },
        colors: ["#ff6f61", "#ffd166", "#06d6a0", "#118ab2", "#ef476f"],
        ticks: 100,
        scalar: 0.9,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  
  const fetchTopicsByTheme = async (selectedTheme) => {
    const res = await fetch(
      `${API_BASE_URL}/api/topics/theme?theme=${encodeURIComponent(
        selectedTheme
      )}`
    );
    const data = await res.json();
    return data;
  };

  const startRolling = async () => {
    if (rolling) return;
    setRolling(true);

    let topics = topicsCache;
    if (!topics || topics.length === 0) {
      topics = await fetchTopicsByTheme(theme);
      setTopicsCache(topics);
    }

    if (!topics || topics.length === 0) {
      setDisplayTopic("No topics found!");
      setRolling(false);
      return;
    }

    const maxRolls = 15;
    let count = 0;

    const rollAnimation = () => {
      const randomIndex = Math.floor(Math.random() * topics.length);
      setDisplayTopic(topics[randomIndex].content);
      count++;
      if (count < maxRolls) {
        setTimeout(rollAnimation, 100);
      } else {
        setTopic(topics[randomIndex]);
        setRolling(false);
        fireConfetti();
      }
    };

    rollAnimation();
  };

  useEffect(() => {
    setDisplayTopic("「▶️次の話題」を押してください");
    setTopic(null);
    setTopicsCache([]);
  }, [theme]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>🍻飲みトーク🍻</h1>
        <div className={styles.themeList}>
          {themes.map((t) => (
            <ThemeCard
              key={t.name}
              name={t.name}
              icon={t.icon}
              selected={theme === t.name}
              onClick={() => !rolling && setTheme(t.name)}
            />
          ))}
        </div>

        <TopicDisplay ref={topicAreaRef} text={displayTopic} />

        <RollButton onClick={startRolling} disabled={rolling} />
      </div>
    </div>
  );
}

export default App;
