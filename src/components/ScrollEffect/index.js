import React, { useEffect, useRef } from 'react';
 
const ScrollDraw = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;

    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const handleScroll = debounce(() => {
      const scrollPercentage =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const drawLength = scrollPercentage * pathLength;
      path.style.strokeDashoffset = pathLength - drawLength;
    }, 10);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="dynamic">
      <svg preserveAspectRatio="none" viewBox="0 0 100 100">
        <path
          ref={pathRef}
          d="M0,50 Q50,0 100,50 T0,50"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default ScrollDraw;