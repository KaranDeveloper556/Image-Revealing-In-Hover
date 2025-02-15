import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const cursorSize = 60;
  const [isClicked, setIsClicked] = useState(false);

  const coordinates = {
    x: 0,
    y: 0,
  };

  const cursorRef = useRef();

  const manageMousePosition = (e) => {
    gsap.to(cursorRef.current, {
      x: e.clientX - cursorSize / 2,
      y: e.clientY - (cursorSize - 30) / 2,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  useEffect(() => {
    // Mouse movement
    window.addEventListener("mousemove", manageMousePosition);

    // Click events
    window.addEventListener("mousedown", () => setIsClicked(true));
    window.addEventListener("mouseup", () => setIsClicked(false));

    return () => {
      window.removeEventListener("mousemove", manageMousePosition);
      window.removeEventListener("mousedown", () => setIsClicked(true));
      window.removeEventListener("mouseup", () => setIsClicked(false));
    };
  }, []);

  useEffect(() => {
    if (isClicked) {
      gsap.to(cursorRef.current, {
        scale: 0.6,
        ease: "power3.out",
        duration: 0.3,
      });
    } else {
      gsap.to(cursorRef.current, {
        scale: 1.2,
        ease: "power3.out",
        duration: 0.3,
      });
    }
  }, [isClicked]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-[9999] hidden sm:block">
      <div
        ref={cursorRef}
        className="text-orange-700 rounded-full absolute font-extrabold text-5xl leading-[0.8]"
      >
        -
      </div>
    </div>
  );
};

export default Cursor;