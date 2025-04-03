import { categoryColors as importedCategoryColors, getContrastColor as importedGetContrastColor } from './assessment-flow';

interface LifeWheelVisualizationProps {
  scores: Record<string, number>;
}

export function LifeWheelVisualization({ scores }: LifeWheelVisualizationProps) {
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

  // Generate points for the spider web - increased scale
  const getPoints = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const radius = (value / 10) * 150; // Increased scale for larger chart
    return {
      x: 250 + radius * Math.cos(angle), // Increased center point
      y: 230 + radius * Math.sin(angle)  // Increased center point
    };
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

  // Custom label positioning for each category - adjusted for larger chart
  const getLabelPosition = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    // Base position with increased radius for labels
    const labelRadius = 210; // Increased radius for labels
    let point = {
      x: 250 + labelRadius * Math.cos(angle), // Increased center point
      y: 230 + labelRadius * Math.sin(angle)  // Increased center point
    };
    
    // Fine-tune positions for each label to prevent overlap
    // Adjust these values as needed for your specific layout
    switch (index % 8) {
      case 0: // Top
        point.y += 20;
        break;
      case 1: // Top-right
        point.x += 20;
        point.y += 20;
        break;
      case 2: // Right
        point.x -= 5;
        break;
      case 3: // Bottom-right
        point.x += 20;
        point.y -= 20;
        break;
      case 4: // Bottom
        point.y -= 20;
        break;
      case 5: // Bottom-left
        point.x -= 20;
        point.y -= 15;
        break;
      case 6: // Left
        point.x += 5; // Increased offset for left labels
        break;
      case 7: // Top-left
        point.x -= 20;
        point.y += 20;
        break;
    }
    
    return point;
  };

  // Get width based on category name
  const getLabelWidth = (category: string) => {
    // Special case handling for specific categories that need extra width
    if (category === "Character Development") return 85; // Reduced width since it's now on two lines
    if (category === "Side Hustle Dungeon") return 130; // Increased from 160
    if (category === "Love Quest") return 85; // Added specific width for Love Quest
    if (category === "Hero's Journey") return 100; // Added specific width for Hero's Journey
    
    // More precise width calculation based on character count
    // Each character is approximately 7px wide in the 10px font size
    const baseWidth = 20; // Padding (2px left + 2px right) + some buffer
    const charWidth = 6.5; // Increased approximate width per character
    
    // Calculate width based on text length with more extra space for safety
    return Math.max(100, baseWidth + (category.length * charWidth));
  };

  return (
    <div className="relative w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 500 460"> {/* Increased viewBox width and height */}
        {/* Background circles */}
        {[...Array(10)].map((_, i) => (
          <polygon
            key={i}
            points={categories.map((_, j) => {
              const point = getPoints((i + 1), j);
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
            const point = getPoints(scores[category], i);
            return `${point.x},${point.y}`;
          }).join(' ')}
          fill="rgba(255, 46, 0, 0.25)"
          stroke="#FF4D00"
          strokeWidth="2"
        />

        {/* Ideal life area - using the calculated ideal scores */}
        <polygon
          points={categories.map((category, i) => {
            const point = getPoints(idealScores[category], i);
            return `${point.x},${point.y}`;
          }).join(' ')}
          fill="rgba(57, 255, 229, 0.25)"
          stroke="#39FFE5"
          strokeWidth="2"
        />

        {/* Scale numbers */}
        {[...Array(10)].map((_, i) => (
          <text
            key={i}
            x="250" // Increased center point
            y={230 - (i + 1) * 15} // Increased spacing
            className="text-xs fill-[#664EC9]"
            textAnchor="middle"
          >
            {i + 1}
          </text>
        ))}

        {/* Category labels - with custom positioning */}
        {categories.map((category, i) => {
          const point = getLabelPosition(i);
          
          // Always use a default color to avoid errors
          const defaultColor = "#CCCCCC";
          // Try to get the color from categoryColors, but use default if not found
          const color = (categoryColors as Record<string, string>)[category] || defaultColor;
          
          // Dynamically calculate width based on text content
          const finalWidth = getLabelWidth(category);
          
          // Format label text - split "Character Development" into two lines
          let displayText = category;
          if (category === "Character Development") {
            displayText = "Character\nDevelopment";
          }
          
          return (
            <foreignObject
              key={category}
              x={point.x - (finalWidth/2)} // Center based on dynamic width
              y={point.y - 15}
              width={finalWidth} // Dynamic width based on text length with special cases
              height={category === "Character Development" ? 40 : 30} // Increased height for two-line label
            >
              <div 
                className={`px-2 py-1 rounded text-center text-[10px] font-medium w-full ${
                  category === "Character Development" ? "flex flex-col justify-center" : ""
                }`}
                style={{ 
                  backgroundColor: color,
                  color: getContrastColor(color),
                  whiteSpace: category === "Character Development" ? "pre-line" : "nowrap", // Allow line breaks for Character Development
                  overflow: "visible",
                  textOverflow: "clip",
                  fontSize: "10px",
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

      {/* Legend - positioned lower at the bottom of the chart */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-6 bg-white rounded-2xl px-4 py-3 mx-auto w-fit shadow-sm">
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
  );
}