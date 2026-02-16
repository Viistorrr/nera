"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Object3D } from "three";

const GEOJSON_URL =
  "https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_110m_admin_0_countries.geojson";
const EARTH_IMAGE =
  "https://unpkg.com/three-globe@2/example/img/earth-night.jpg";

const HIGHLIGHT_COLOR = "#D4AF37";
const DEFAULT_COLOR = "rgba(40,40,40,0.85)";

// Costa pacífica de Colombia (aproximada): puntos desde norte hacia sur
const PACIFIC_COAST_PATH = [
  [8.67, -77.37],
  [7.22, -77.89],
  [6.19, -77.39],
  [5.0, -77.35],
  [3.87, -77.25],
  [2.96, -78.18],
  [1.45, -78.75],
  [0.83, -80.0],
];

type GeoFeature = GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon> & {
  properties?: { ADMIN?: string; CONTINENT?: string };
};

function GlobeObject({ onReady }: { onReady: (globe: Object3D) => void }) {
  const { scene } = useThree();
  const globeRef = useRef<Object3D | null>(null);

  useEffect(() => {
    let mounted = true;
    let GlobeClass: new () => Object3D;

    import("three-globe").then((mod) => {
      GlobeClass = mod.default as new () => Object3D;
      if (!mounted) return;

      const globe = new GlobeClass() as unknown as {
        globeImageUrl: (u: string) => unknown;
        showAtmosphere: (s: boolean) => unknown;
        atmosphereColor: (c: string) => unknown;
        atmosphereAltitude: (a: number) => unknown;
        polygonsData: (d: object[]) => unknown;
        polygonCapColor: (fn: (d: { properties?: { ADMIN?: string; CONTINENT?: string } }) => string) => unknown;
        polygonSideColor: (c: string) => unknown;
        polygonAltitude: (fn: (d: { properties?: { ADMIN?: string; CONTINENT?: string } }) => number) => unknown;
        pathsData: (d: object[]) => unknown;
        pathPoints: (d: (obj: { points: { lat: number; lng: number }[] }) => { lat: number; lng: number }[]) => unknown;
        pathPointLat: (fn: (p: { lat: number }) => number) => unknown;
        pathPointLng: (fn: (p: { lng: number }) => number) => unknown;
        pathColor: (c: string) => unknown;
        pathStroke: (n: number) => unknown;
      };

      globe.globeImageUrl(EARTH_IMAGE);
      globe.showAtmosphere(true);
      globe.atmosphereColor("#0a0a0a");
      globe.atmosphereAltitude(0.15);

      fetch(GEOJSON_URL)
        .then((r) => r.json())
        .then((geojson: GeoJSON.FeatureCollection) => {
          if (!mounted) return;
          const features = (geojson.features || []) as GeoFeature[];

          globe.polygonsData(features);
          globe.polygonCapColor((d) => {
            const props = d.properties || {};
            const continent = (props.CONTINENT ?? (props as { continent?: string }).continent) ?? "";
            const admin = (props.ADMIN ?? (props as { name?: string }).name) ?? "";
            const isAfrica = String(continent) === "Africa";
            const isColombia = String(admin) === "Colombia";
            if (isAfrica || isColombia) return HIGHLIGHT_COLOR;
            return DEFAULT_COLOR;
          });
          globe.polygonSideColor("rgba(0,0,0,0.3)");
          globe.polygonAltitude((d) => {
            const props = d.properties || {};
            const continent = (props.CONTINENT ?? (props as { continent?: string }).continent) ?? "";
            const admin = (props.ADMIN ?? (props as { name?: string }).name) ?? "";
            if (String(continent) === "Africa" || String(admin) === "Colombia")
              return 0.02;
            return 0.01;
          });

          // Costa pacífica: línea
          globe.pathsData([
            {
              points: PACIFIC_COAST_PATH.map(([lat, lng]) => ({
                lat,
                lng,
              })),
            },
          ]);
          globe.pathPoints((d: { points: { lat: number; lng: number }[] }) => d.points);
          globe.pathPointLat((p: { lat: number }) => p.lat);
          globe.pathPointLng((p: { lng: number }) => p.lng);
          globe.pathColor(HIGHLIGHT_COLOR);
          globe.pathStroke(1.2);

          const globeObj = globe as unknown as Object3D;
          scene.add(globeObj);
          globeRef.current = globeObj;
          onReady(globeObj);
        })
        .catch(() => {
          // Fallback: globo sin polígonos
          globe.polygonsData([]);
          const globeObj = globe as unknown as Object3D;
          scene.add(globeObj);
          globeRef.current = globeObj;
          onReady(globeObj);
        });

      return () => {
        mounted = false;
        if (globeRef.current) scene.remove(globeRef.current);
      };
    });

    return () => {
      mounted = false;
      if (globeRef.current) {
        try {
          scene.remove(globeRef.current);
        } catch {
          // ignore
        }
      }
    };
  }, [scene, onReady]);

  return null;
}

function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 280);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

export function WorldMap3D({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReady = useMemo(
    () => () => {
      // Opcional: lógica post-carga
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight: 320, position: "relative" }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 280], fov: 45 }}
        style={{ width: "100%", height: "100%", minHeight: 320 }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[200, 200, 200]} intensity={1.2} />
        <pointLight position={[-150, -100, 100]} intensity={0.4} />
        <CameraSetup />
        <GlobeObject onReady={handleReady} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={180}
          maxDistance={400}
          rotateSpeed={0.6}
        />
      </Canvas>
      <div
        className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 backdrop-blur-sm"
        aria-hidden
      >
        Arrastra para rotar · Scroll para zoom · África · Colombia · Costa pacífica
      </div>
    </div>
  );
}
