import { useEffect, useState } from "react";
import "../styles/footer.css";

const Footer = () => {
  const emojis = ["❤️", "👨‍💻", "☕", "🤓", "🔥", "💪", "😊", "🧠"];
  const [displayedEmojiIndex, setDisplayedEmojiIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const index = displayedEmojiIndex + 1 >= emojis.length ? 0 : displayedEmojiIndex + 1;
      setDisplayedEmojiIndex(index);
    }, 1000);

    return () => clearInterval(timer);
  }, [displayedEmojiIndex, emojis.length]);

  return (
    <footer>
      <div>Made with {emojis[displayedEmojiIndex]} by Olivier M.</div>
    </footer>
  );
};

export default Footer;
