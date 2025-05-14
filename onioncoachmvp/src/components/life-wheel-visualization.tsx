import { categoryColors as importedCategoryColors, getContrastColor as importedGetContrastColor } from './assessment-flow';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface LifeWheelVisualizationProps {
  scores: Record<string, number>;
}

export function LifeWheelVisualization({ scores }: LifeWheelVisualizationProps) {
  const [activeDot, setActiveDot] = useState<number | null>(null);

  // Local fallback definitions in case imports fail
  const fallbackCategoryColors = {
    "Family Clan": "#9BEA5E",
    "Adventure Party": "#5EC4EA",
    "Love Quest": "#17CDBA",
    "Hero's Journey": "#26FFE6",
    "Side Hustle Dungeon": "#FF4D88",
    "Treasure Vault": "#CA88FF",
    "Character Development": "#EA755E",
    "Health XP Bar": "#EADE5E"
  };

  // Use imported or fallback
  const categoryColors = importedCategoryColors || fallbackCategoryColors;

  // Fallback contrast color function
  function getContrastColor(hexColor: string): string {
    if (importedGetContrastColor) {
      return importedGetContrastColor(hexColor);
    }
    
    // Local implementation if imported function is not available
    // Remove the hash if it exists
    const color = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    
    // Calculate luminance - standard formula for perceived brightness
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for bright colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  const categories = Object.keys(scores);
  const numCategories = categories.length;
  const angleStep = (2 * Math.PI) / numCategories;

  // --- Desktop chart config ---
  const desktopConfig = {
    centerX: 300,
    centerY: 300,
    chartRadius: 260,
    labelRadius: 310,
    viewBox: '0 -40 600 680',
    scaleSpacing: 220,
    fontSize: 12,
    labelWidth: (category: string) => {
      if (category === "Character Development") return 110;
      if (category === "Side Hustle Dungeon") return 180;
      if (category === "Love Quest") return 110;
      if (category === "Hero's Journey") return 120;
      const baseWidth = 30;
      const charWidth = 10;
      return Math.max(140, baseWidth + (category.length * charWidth));
    },
    getLabelPosition: (index: number) => {
      const angle = index * angleStep - Math.PI / 2;
      let x = 300 + 310 * Math.cos(angle);
      let y = 300 + 310 * Math.sin(angle);
      if (index === 5) y += 20;
      return { x, y };
    },
    getPoints: (value: number, index: number) => {
      const angle = index * angleStep - Math.PI / 2;
      const radius = (value / 10) * 260;
      return {
        x: 300 + radius * Math.cos(angle),
        y: 300 + radius * Math.sin(angle)
      };
    },
    scaleNumbers: Array.from({ length: 10 }, (_, i) => ({
      x: 300,
      y: 300 - ((i + 1) / 10) * 220,
      value: i + 1
    }))
  };

  // --- Mobile chart config ---
  const mobileConfig = {
    centerX: 250,
    centerY: 250,
    chartRadius: 200,
    labelRadius: 220,
    viewBox: '0 -5 500 450',
    scaleSpacing: 15,
    fontSize: 10,
    getLabelPosition: (index: number) => {
      const angle = index * angleStep - Math.PI / 2;
      let point = {
        x: 250 + 210 * Math.cos(angle),
        y: 230 + 210 * Math.sin(angle)
      };
      switch (index % 8) {
        case 0: point.y += 20; break;
        case 1: point.x += 20; point.y += 20; break;
        case 2: point.x -= 5; break;
        case 3: point.x += 20; point.y -= 20; break;
        case 4: point.y -= 10; break;
        case 5: point.x -= 20; point.y -= 15; break;
        case 6: point.x += 5; break;
        case 7: point.x -= 20; point.y += 20; break;
      }
      return point;
    },
    getPoints: (value: number, index: number) => {
      const angle = index * angleStep - Math.PI / 2;
      const radius = (value / 10) * 170;
      return {
        x: 250 + radius * Math.cos(angle),
        y: 230 + radius * Math.sin(angle)
      };
    },
    scaleNumbers: Array.from({ length: 10 }, (_, i) => ({
      x: 250,
      y: 230 - (i + 1) * 15,
      value: i + 1
    }))
  };

  // Calculate ideal scores based on current scores
  const idealScores = Object.entries(scores).reduce((acc, [category, score]) => {
    // More nuanced ideal calculation:
    // - If score is low (0-3), aim for +3
    // - If score is medium (4-6), aim for +2
    // - If score is high (7-10), aim for +1
    let improvement = score <= 3 ? 3 : score <= 6 ? 2 : 1;
    acc[category] = Math.min(10, score + improvement);
    return acc;
  }, {} as Record<string, number>);

  // Chart rendering function for desktop (labels as colored boxes)
  function renderDesktopChart(config: typeof desktopConfig) {
    return (
      <svg width="100%" height="100%" viewBox={config.viewBox}>
        {/* Background circles */}
        {[...Array(10)].map((_, i) => (
          <polygon
            key={i}
            points={categories.map((_, j) => {
              const point = config.getPoints(i + 1, j);
              return `${point.x},${point.y}`;
            }).join(' ')}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        ))}
        {/* Score areas */}
        <polygon
          points={categories.map((category, i) => {
            const point = config.getPoints(scores[category], i);
            return `${point.x},${point.y}`;
          }).join(' ')}
          fill="rgba(255, 46, 0, 0.25)"
          stroke="#FF4D00"
          strokeWidth="2"
        />
        {/* Ideal life area */}
        <polygon
          points={categories.map((category, i) => {
            const point = config.getPoints(idealScores[category], i);
            return `${point.x},${point.y}`;
          }).join(' ')}
          fill="rgba(57, 255, 229, 0.25)"
          stroke="#39FFE5"
          strokeWidth="2"
        />
        {/* Scale numbers */}
        {config.scaleNumbers.map((s, i) => (
          <text
            key={i}
            x={s.x}
            y={s.y}
            className="text-xs fill-[#664EC9]"
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{ fontWeight: 500, fontSize: config.fontSize }}
          >
            {s.value}
          </text>
        ))}
        {/* Category labels as colored boxes */}
        {categories.map((category, i) => {
          const point = config.getLabelPosition(i);
          const color = (categoryColors as Record<string, string>)[category] || "#CCCCCC";
          const finalWidth = config.labelWidth(category);
          let displayText = category;
          if (category === "Character Development") {
            displayText = "Character\nDevelopment";
          }
          return (
            <foreignObject
              key={category}
              x={point.x - (finalWidth/2)}
              y={point.y - 15}
              width={finalWidth}
              height={category === "Character Development" ? 40 : 30}
            >
              <div
                className={`px-2 py-1 rounded text-center font-medium w-full ${category === "Character Development" ? "flex flex-col justify-center" : ""}`}
                style={{
                  backgroundColor: color,
                  color: getContrastColor(color),
                  whiteSpace: category === "Character Development" ? "pre-line" : "nowrap",
                  overflow: "visible",
                  textOverflow: "clip",
                  fontSize: config.fontSize,
                  lineHeight: "1.2",
                  height: category === "Character Development" ? "auto" : "unset"
                }}
              >
                {displayText}
              </div>
            </foreignObject>
          );
        })}
      </svg>
    );
  }

  // Chart rendering function for mobile (tab dot + tooltip)
  function renderMobileChart(config: typeof mobileConfig) {
    return (
      <svg width="100%" height="100%" viewBox={config.viewBox}>
        {/* Background circles */}
        {[...Array(10)].map((_, i) => (
          <polygon
            key={i}
            points={categories.map((_, j) => {
              const point = config.getPoints(i + 1, j);
              return `${point.x},${point.y}`;
            }).join(' ')}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        ))}
        {/* Score areas */}
        <polygon
          points={categories.map((category, i) => {
            const point = config.getPoints(scores[category], i);
            return `${point.x},${point.y}`;
          }).join(' ')}
          fill="rgba(255, 46, 0, 0.25)"
          stroke="#FF4D00"
          strokeWidth="2"
        />
        {/* Ideal life area */}
        <polygon
          points={categories.map((category, i) => {
            const point = config.getPoints(idealScores[category], i);
            return `${point.x},${point.y}`;
          }).join(' ')}
          fill="rgba(57, 255, 229, 0.25)"
          stroke="#39FFE5"
          strokeWidth="2"
        />
        {/* Scale numbers */}
        {config.scaleNumbers.map((s, i) => (
          <text
            key={i}
            x={s.x}
            y={s.y}
            className="text-xs fill-[#664EC9]"
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{ fontWeight: 500, fontSize: config.fontSize }}
          >
            {s.value}
          </text>
        ))}
        {/* Category tab dots with tooltip labels */}
        {categories.map((category, i) => {
          const point = config.getLabelPosition(i);
          const color = (categoryColors as Record<string, string>)[category] || "#CCCCCC";
          return (
            <g key={category}>
              {/* Tab dot */}
              <rect
                x={point.x - 12}
                y={point.y - 12}
                width={24}
                height={24}
                rx={5}
                fill={color}
                stroke="#fff"
                strokeWidth={3}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActiveDot(i)}
                onMouseLeave={() => setActiveDot(null)}
                onTouchStart={() => setActiveDot(i)}
                onTouchEnd={() => setActiveDot(null)}
              />
              {/* Tooltip/Popover */}
              {activeDot === i && (
                <foreignObject
                  x={point.x - 70}
                  y={point.y - 50}
                  width={140}
                  height={36}
                >
                  <div
                    className="rounded px-3 py-1 shadow text-xs font-medium flex items-center justify-center"
                    style={{
                      background: color,
                      color: '#111',
                      borderRadius: 8,
                      minHeight: 28,
                      fontWeight: 500,
                      pointerEvents: 'none',
                    }}
                  >
                    {category} : <b className="ml-1">{scores[category]}</b>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  // --- Render ---
  return (
    <div className="relative w-full h-full">
      {/* Desktop chart and legend */}
      <div className="hidden md:flex w-full h-full flex-col items-center justify-center relative">
        <div className="w-full flex items-center justify-center" style={{minHeight: 540}}>
          {renderDesktopChart(desktopConfig)}
        </div>
        {/* Desktop legend at bottom of chart (original, now separated and centered) */}
        <div className="hidden md:flex mt-6 items-center justify-center gap-6 bg-white rounded-2xl px-4 py-3 mx-auto w-fit shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#39FFE5] rounded-sm" />
            <span className="text-sm">Ideal life</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#FF4D00] rounded-sm" />
            <span className="text-sm">Current focus</span>
          </div>
        </div>
      </div>
      {/* Mobile chart and legend */}
      <div className="md:hidden w-full h-full">
        {renderMobileChart(mobileConfig)}
      </div>
    </div>
  );
}