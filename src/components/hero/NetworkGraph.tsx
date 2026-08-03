import { useMemo } from "react";
import type { JSX } from 'react';

const LAYERS: number[][] = [
  [120, 450],
  [420, 180, 450, 720],
  [760, 120, 320, 580, 780],
  [1100, 180, 450, 720],
  [1400, 450],
];

export default function NetworkGraph() {
  const { links, nodes } = useMemo(() => {
    const pts: [number, number][] = [];
    LAYERS.forEach((col) => {
      const x = col[0];
      for (let i = 1; i < col.length; i++) pts.push([x, col[i]]);
    });

    const linkEls: JSX.Element[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const [ax, ay] = pts[i];
        const [bx, by] = pts[j];
        if (Math.abs(ax - bx) <= 380 && Math.abs(ax - bx) > 0 && Math.random() > 0.55) {
          linkEls.push(<line key={`${i}-${j}`} className="link" x1={ax} y1={ay} x2={bx} y2={by} />);
        }
      }
    }

    const nodeEls = pts.map(([x, y], i) => (
      <circle key={i} className="node" cx={x} cy={y} r={5 + Math.random() * 4} />
    ));

    return { links: linkEls, nodes: nodeEls };
  }, []);

  return (
    <g className="net" id="netGroup">
      {links}
      {nodes}
    </g>
  );
}