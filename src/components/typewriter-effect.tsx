
"use client";

import { useState, useEffect } from 'react';

const phrases = [
  "We Grow Your Brand.",
  "Data-Driven Strategies.",
  "Maximizing Your ROI.",
  "Creative Campaigns.",
];

const TypewriterEffect = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let handle: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        handle = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    handle = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(handle);
  }, [text, isDeleting, loopNum, typingSpeed, isMounted]);
  
  if (!isMounted) {
    return <span>&nbsp;</span>;
  }

  return (
    <span>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterEffect;
