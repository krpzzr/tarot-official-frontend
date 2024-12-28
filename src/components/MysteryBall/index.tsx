import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const results = ["Да", "Нет", "Может быть", "Скорее всего да", "Точно нет", "Скорее всего нет"];

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
  const [isShaking, setShaking] = useState<boolean>(false);
  const [particles, setParticles] = useState<Array<{ top: string; left: string; animationDuration: string; animationDelay: string }>>([]);

  useEffect(() => {
    setParticles(generateParticles(20));
  }, []);

  const handleClick = () => {
    if (isShaking) return;
    setAnswer('');
    setShaking(true);
    setTimeout(() => {
      const randomAnswer = results[Math.floor(Math.random() * results.length)];
      setAnswer(randomAnswer);
      setShaking(false);
    }, 3000); // Анимация длится 3 секунды
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.ball} ${isShaking ? styles.shaking : ""}`}
        onClick={handleClick}
      >
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
            ></div>
          ))}
        </div>
        <div className={styles.answer}>{answer || ''}</div>
      </div>
    </div>
  );
};

export default MagicBall;
