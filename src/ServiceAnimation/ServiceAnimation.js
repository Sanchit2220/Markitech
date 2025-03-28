import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import "./ServiceAnimation.css";

const FallingText = ({
  text = "",
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem"
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Splitting words & highlighting
  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(" ");
    textRef.current.innerHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
  }, [text, highlightWords, highlightClass]);

  // Trigger animation on scroll, click, or hover
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Falling text effect using Matter.js
  useEffect(() => {
    if (!effectStarted || !containerRef.current || !canvasContainerRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    // Boundaries to keep words inside the container
    const boundaryOptions = { isStatic: true, render: { fillStyle: "transparent" } };
    const floor = Bodies.rectangle(width / 2, height + 10, width, 20, boundaryOptions);
    const leftWall = Bodies.rectangle(0, height / 2, 20, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width, height / 2, 20, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, 0, width, 20, boundaryOptions);

    // Create word bodies
    const wordSpans = textRef.current.querySelectorAll(".word");
    const wordBodies = [...wordSpans].map((elem, index) => {
      const rect = elem.getBoundingClientRect();

      // Correcting positioning: centering words properly inside the container
      const x = (index / wordSpans.length) * width; 
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.8, // Increased bounce
        frictionAir: 0.02, // Less air resistance to spread out
      });

      // Improved initial velocities for better spread
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: Math.random() * -3 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
      return { elem, body };
    });

    // Position words absolutely inside the container
    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = "translate(-50%, -50%)";
    });

    // Mouse interaction
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } },
    });
    render.mouse = mouse;

    // Add everything to the world
    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Update word positions
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = ""; // Remove canvas on cleanup
      }
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  // Click / Hover trigger
  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="falling-text-container"
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseOver={trigger === "hover" ? handleTrigger : undefined}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "80vh",
      }}
    >
      <h1>Let's start working together</h1>
      <div
        ref={textRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.4, position: "relative" }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
