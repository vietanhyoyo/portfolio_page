"use client";

import { animate, createScope, onScroll } from "animejs";
import { useEffect, useRef } from "react";

type Point3D = { x: number; y: number; z: number };
type Edge = readonly [number, number];

function createSphereTopology(latitudeSteps: number, longitudeSteps: number) {
  const points: Point3D[] = [];
  const edges: Edge[] = [];

  for (let lat = 0; lat <= latitudeSteps; lat += 1) {
    const phi = -Math.PI / 2 + (lat / latitudeSteps) * Math.PI;
    const radius = Math.cos(phi);

    for (let lon = 0; lon < longitudeSteps; lon += 1) {
      const theta = (lon / longitudeSteps) * Math.PI * 2;
      points.push({
        x: radius * Math.cos(theta),
        y: Math.sin(phi),
        z: radius * Math.sin(theta),
      });

      const current = lat * longitudeSteps + lon;
      const nextLongitude = lat * longitudeSteps + ((lon + 1) % longitudeSteps);
      edges.push([current, nextLongitude]);

      if (lat < latitudeSteps) {
        const nextLatitude = (lat + 1) * longitudeSteps + lon;
        const diagonal =
          (lat + 1) * longitudeSteps + ((lon + 1) % longitudeSteps);
        edges.push([current, nextLatitude]);
        if ((lat + lon) % 2 === 0) edges.push([current, diagonal]);
      }
    }
  }

  return { points, edges };
}

export default function HeroSkillsGlobe() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let topology = createSphereTopology(14, 24);
    let width = 0;
    let height = 0;
    let dark = document.documentElement.classList.contains("dark");
    const state = { rotateX: -0.24, rotateY: -0.7, opacity: 0.3 };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (width === 0 || height === 0) return;

      const radius = Math.min(width * 0.52, height * 0.46);
      const centerX = width / 2;
      const centerY = height / 2;
      const sinX = Math.sin(state.rotateX);
      const cosX = Math.cos(state.rotateX);
      const sinY = Math.sin(state.rotateY);
      const cosY = Math.cos(state.rotateY);

      const projected = topology.points.map((point) => {
        const x1 = point.x * cosY - point.z * sinY;
        const z1 = point.x * sinY + point.z * cosY;
        const y2 = point.y * cosX - z1 * sinX;
        const z2 = point.y * sinX + z1 * cosX;
        const perspective = 2.8 / (3.25 - z2);

        return {
          x: centerX + x1 * radius * perspective,
          y: centerY + y2 * radius * perspective,
          z: z2,
        };
      });

      context.lineWidth = Math.max(0.65, Math.min(width / 720, 1.35));
      context.lineCap = "round";

      for (const [fromIndex, toIndex] of topology.edges) {
        const from = projected[fromIndex];
        const to = projected[toIndex];
        const depth = Math.max(0.08, Math.min(1, ((from.z + to.z) / 2 + 1) / 2));
        const alpha = (0.045 + depth * 0.42) * state.opacity;
        context.strokeStyle = dark
          ? `rgba(96, 189, 255, ${alpha})`
          : `rgba(0, 111, 232, ${alpha})`;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
      }
    };

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      topology = createSphereTopology(width < 500 ? 10 : 14, width < 500 ? 18 : 24);
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark");
      draw();
    });

    resizeObserver.observe(root);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    resize();

    const scope = createScope({
      root,
      mediaQueries: { reduceMotion: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (self?.matches.reduceMotion) {
        state.opacity = 0.45;
        draw();
        return;
      }

      animate(state, {
        rotateY: Math.PI * 1.75,
        rotateX: 0.28,
        opacity: [0.12, 1, 0.2],
        ease: "linear",
        autoplay: onScroll({ target: root, sync: 0.18 }),
        onUpdate: draw,
      });
    });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      scope.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="globe-transition-mask pointer-events-none relative z-0 -my-[19rem] h-[38rem] w-full overflow-hidden sm:-my-[25rem] sm:h-[50rem] lg:-my-[45rem] lg:h-[90rem]"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="ambient-glow absolute inset-[7%] opacity-90" />
    </div>
  );
}
