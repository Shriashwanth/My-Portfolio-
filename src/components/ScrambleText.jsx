import React, { useState, useEffect } from "react";

export default function ScrambleText({ text, delay = 0, startTrigger = true }) {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|";

  useEffect(() => {
    if (!startTrigger) return;

    let isCancelled = false;
    const finalChars = text.split("");
    let currentText = finalChars.map(() => " "); // start with spacing
    setDisplayText(currentText.join(""));

    let timeouts = [];

    finalChars.forEach((char, index) => {
      // 6 cycles per character, 30ms per cycle
      // staggered by 40ms per character
      const charDelay = delay + index * 40;

      const runScramble = (cycle) => {
        if (isCancelled) return;
        if (cycle < 6) {
          // Put random character
          currentText[index] = chars[Math.floor(Math.random() * chars.length)];
          setDisplayText(currentText.join(""));
          let t = setTimeout(() => runScramble(cycle + 1), 30);
          timeouts.push(t);
        } else {
          // Resolve to correct character
          currentText[index] = char;
          setDisplayText(currentText.join(""));
        }
      };

      let t = setTimeout(() => runScramble(0), charDelay);
      timeouts.push(t);
    });

    return () => {
      isCancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [text, delay, startTrigger]);

  return <span>{displayText}</span>;
}
