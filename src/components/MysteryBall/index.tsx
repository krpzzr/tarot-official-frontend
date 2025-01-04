import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const results =  ["Да", "Нет", "Очень сомнительно", "Может быть", "Сомнительно", "Не сейчас", "Спроси позже", "Возможно", "Похоже, что да", "Знаки говорят, что нет"];

const generateParticles = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    animationDuration: Math.random() * 2 + 3 + "s",
    animationDelay: Math.random() * 2 + "s",
  }));
};

const MagicBall = () => {
  const [answer, setAnswer] = useState<string>("");
  const [isBouncing, setBouncing] = useState<boolean>(false);
  const [particles, setParticles] = useState<Array<{ top: string; left: string; animationDuration: string; animationDelay: string }>>([]);

  useEffect(() => {
    setParticles(generateParticles(20));
  }, []);

  const handleClick = () => {
    if (isBouncing) return;
    setAnswer('');
    setBouncing(true);
    setTimeout(() => {
      const randomAnswer = results[Math.floor(Math.random() * results.length)];
      setAnswer(randomAnswer);
      setBouncing(false);
    }, 3000); // Длительность анимации 3 секунды
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.ball} ${isBouncing ? styles.bouncing : ''}`} onClick={handleClick}>
        <div className={styles.particles}>
          {particles.map((particle, index) => (
            <div
              key={index}
              className={styles.particle}
              style={{
                top: particle.top,
                left: particle.left,
                animationDuration: particle.animationDuration,
                animationDelay: particle.animationDelay,
              }}
            />
          ))}
        </div>
        <div className={styles.answer}>{answer}</div>
      </div>
    </div>
  );
};

export default MagicBall;