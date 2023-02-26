import React, { useCallback, useEffect, useState } from "react";

export default function BackToTop() {
  const [backToTop, setBackToTop] = useState(false);

  const scrollUp = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="fixed bottom-16 mb-6 md:mb-0 right-5 md:bottom-7 md:right-5 z-50">
      {backToTop && (
        <img
          onClick={scrollUp}
          className="w-10 lg:w-12 h-10 lg:h-12 object-cover cursor-pointer hover:brightness-75"
          src="https://cdn-icons-png.flaticon.com/512/9172/9172380.png"
          alt=""
        ></img>
      )}
    </div>
  );
}
