import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';

import './time.scss';

 

const data = [

  { place: 'Switzerland Alps', title: 'SAINT', title2: 'ANTONIEN', description: 'Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat...', image: 'https://assets.codepen.io/3685267/timed-cards-1.jpg' },

  { place: 'French Riviera', title: 'COTE', title2: "D'AZUR", description: 'The French Riviera is known for its stunning coastlines and vibrant culture...', image: 'https://assets.codepen.io/3685267/timed-cards-2.jpg' },

  { place: 'Italian Dolomites', title: 'DOLOMITI', title2: 'ITALIA', description: 'The Italian Dolomites offer breathtaking mountain views and skiing...', image: 'https://assets.codepen.io/3685267/timed-cards-3.jpg' },

  { place: 'Spanish Pyrenees', title: 'PIRINEOS', title2: 'ESPAÑA', description: 'The Spanish Pyrenees are a hidden gem for hikers and nature lovers...', image: 'https://assets.codepen.io/3685267/timed-cards-4.jpg' },

  { place: 'Greek Islands', title: 'ELLINIKÁ', title2: 'NISIA', description: 'The Greek Islands are famous for their whitewashed buildings and blue seas...', image: 'https://assets.codepen.io/3685267/timed-cards-5.jpg' },

  { place: 'Norwegian Fjords', title: 'NORSKE', title2: 'FJORDER', description: 'The Norwegian Fjords offer dramatic landscapes and serene waters...', image: 'https://assets.codepen.io/3685267/timed-cards-6.jpg' },

];

 

const WordPressPage = () => {

  const containerRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [showOdd, setShowOdd] = useState(true);

  const order = Array.from({ length: data.length }, (_, i) => i);

  let detailsEven = true;

  const [isHovered, setIsHovered] = useState(false);

  const offsetTop = useRef(200);

  const offsetLeft = useRef(700);

  const cardWidth = 200;

  const cardHeight = 300;

  const gap = 40;

  const ease = 'sine.inOut';

  const loopTimeout = useRef(null);
  const allTweens = useRef([]);

  const getCard = (index) => `#card${index}`;

  const getCardContent = (index) => `#card-content-${index}`;

  const getSliderItem = (index) => `#slide-item-${index}`;

  const animate = (target, duration, properties) => {

    return new Promise((resolve) => {
      const tween = gsap.to(target, {
        ...properties,
        duration: duration,
        onComplete: resolve,
      });
      allTweens.current.push(tween);
    });

  };

  const loadImages = async () => {

    try {

      const promises = data.map(({ image }) => {

        return new Promise((resolve, reject) => {

          const img = new Image();

          img.onload = () => resolve(img);

          img.onerror = reject;

          img.src = image;

        });

      });

      await Promise.all(promises);

      setImagesLoaded(true);

    } catch (error) {

      console.error('Image loading failed:', error);

    }

  };

  const init = () => {

    const [active, ...rest] = order;

    const detailsActive = detailsEven ? '#details-even' : '#details-odd';

    const detailsInactive = detailsEven ? '#details-odd' : '#details-even';

    const { innerHeight: height, innerWidth: width } = window;

    offsetTop.current = height - 430;

    offsetLeft.current = width - 830;

 

    gsap.set('#pagination', {

      top: offsetTop.current + 330,

      left: offsetLeft.current,

      y: 200,

      zIndex: 60,

    });

    gsap.set('nav', { y: -200, opacity: 1 });

 

    gsap.set(getCard(active), {

      x: 0,

      y: 0,

      width: '100vw',

      height: '100vh',

      zIndex: -1,

      willChange: 'transform',

    });

    gsap.set(getCardContent(active), { x: 0, y: 0 });

 

    rest.forEach((i, index) => {

      gsap.set(getCard(i), {

        x: offsetLeft.current + 400 + index * (cardWidth + gap),

        y: offsetTop.current,

        width: cardWidth,

        height: cardHeight,

        zIndex: 30,

        borderRadius: 10,

      });

      gsap.set(getCardContent(i), {

        x: offsetLeft.current + 400 + index * (cardWidth + gap),

        zIndex: 40,

        y: offsetTop.current + cardHeight - 100,

      });

    });

 

    gsap.set('.indicator', { x: -window.innerWidth });

 

    const startDelay = 0.6;

 

    gsap.to('.cover', {

      x: width + 400,

      delay: 0.5,

      ease,

      onComplete: () => {

        setTimeout(() => {

          if (!isHovered) {

            loop();

          }

        }, 500);

      },

    });

 

    rest.forEach((i, index) => {

      gsap.to(getCard(i), {

        x: offsetLeft.current + index * (cardWidth + gap),

        zIndex: 30,

        delay: startDelay + 0.05 * index,

        ease,

      });

      gsap.to(getCardContent(i), {

        x: offsetLeft.current + index * (cardWidth + gap),

        zIndex: 40,

        delay: startDelay + 0.05 * index,

        ease,

      });

    });

 

    gsap.to('#pagination', { y: 0, opacity: 1, ease, delay: startDelay });

    gsap.to('nav', { y: 0, opacity: 1, ease, delay: startDelay });

    if (document.querySelector(detailsActive)) {

      gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

    }

  };

  const step = async () => {

    order.push(order.shift());

    detailsEven = !detailsEven;

 

    const detailsActive = detailsEven ? '#details-even' : '#details-even';

    const detailsInactive = detailsEven ? '#details-even' : '#details-even';

 

    document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;

    document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;

    document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;

    document.querySelector(`${detailsActive} .desc`).textContent = data[order[0]].description;

 

    gsap.set(detailsActive, { zIndex: 22 });

    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });

    gsap.set(detailsInactive, { zIndex: 12 });

    gsap.to(detailsInactive, { opacity: 0, ease });

    gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.5, ease });

    gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.5, ease });

    gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.5, ease });

    gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.5, ease });

    gsap.to(`${detailsActive} .cta`, { y: 0, delay: 0.5, ease });

 

    gsap.set('.progress-sub-foreground', {

      width: 500 * (1 / order.length) * (order.indexOf(0) + 1),

    });

 

    gsap.to(getCard(order[0]), {

      x: 0,

      y: 0,

      width: '100vw',

      height: '100vh',

      zIndex: -9999,

      ease,

    });

    gsap.to(getCardContent(order[0]), {

      x: 0,

      y: 0,

      delay: 0.5,

    });

 

    order.slice(1).forEach((index, i) => {

      gsap.to(getCard(index), {

        x: offsetLeft.current + (i + 1) * (cardWidth + gap),

        y: offsetTop.current,

        width: cardWidth,

        height: cardHeight,

        zIndex: 30,

        ease,

      });

      gsap.to(getCardContent(index), {

        x: offsetLeft.current + (i + 1) * (cardWidth + gap),

        zIndex: 40,

        y: offsetTop.current + cardHeight - 100,

        ease,

      });

    });

  };

  const loop = async () => {

    if (isHovered) {

      clearTimeout(loopTimeout.current);

      return;

    }

    try {

      await animate('.indicator', 2, { x: 0 });

      await animate('.indicator', 0.8, { x: window.innerWidth, delay: 0.3 });

      gsap.set('.indicator', { x: -window.innerWidth });

      await step();

      loopTimeout.current = setTimeout(loop, 0);

    } catch (error) {

      console.error('Loop error:', error);

    }

  };

  const handleMouseEnter = () => {

    setIsHovered(true);
  
    clearTimeout(loopTimeout.current);
    allTweens.current.forEach(tween => tween.pause());

  };

  const handleMouseLeave = () => {

    setIsHovered(false);
    
    allTweens.current.forEach(tween => tween.resume());

    loop();

  };

  useLayoutEffect(() => {

    const start = async () => {

      try {

        await loadImages();

        if (imagesLoaded) {

          init();

        }

      } catch (error) {

        console.error('One or more images failed to load', error);

      }

    };

    start();

 

    return () => {

      gsap.killTweensOf('*');

      clearTimeout(loopTimeout.current);
      
      setIsHovered(false);

    };

  }, [imagesLoaded]);

  return (

    <div ref={containerRef}>

      <div className="indicator"></div>

      <div id="demo">

        {data.map((item, index) => (

          <React.Fragment key={index}>

            <div

              className="card"

              id={`card${index}`} 

              style={{ backgroundImage: `url(${item.image})` }} 

            ></div>

            <div className="card-content" id={`card-content-${index}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >

              <div className="content-start"></div>

              <div className="content-place">{item.place}</div>

              <div className="content-title-1">{item.title}</div>

              <div className="content-title-2">{item.title2}</div>

            </div>

          </React.Fragment>

        ))}

      </div>

      <div className="details" id="details-even">

        <div className="place-box">

          <div className="text">{data[0].place}</div>

        </div>

        <div className="title-1">{data[0].title}</div>

        <div className="title-2">{data[0].title2}</div>

        <div className="desc">{data[0].description}</div>

        <div className="cta">Discover More</div>

      </div>

      <div className="pagination" id="pagination">

        <div className="progress-sub-background"></div>

        <div className="progress-sub-foreground"></div>

      </div>

      <div className="cover"></div>

    </div>

  );

};

 

export default WordPressPage;