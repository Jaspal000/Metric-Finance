import React from 'react';

interface FlagProps {
  className?: string;
  width?: number;
  height?: number;
}

// United States Flag (rectangular, accurate proportions)
export const USFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 190 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Red and white stripes */}
    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
      <rect key={i} x="0" y={i * (100 / 13)} width="190" height={100 / 13} fill="#B22234" />
    ))}
    {/* Blue canton */}
    <rect x="0" y="0" width="76" height={7 * (100 / 13)} fill="#3C3B6E" />
    {/* Simplified stars representation */}
    <g fill="white">
      {[...Array(9)].map((_, row) => (
        [...Array(row % 2 === 0 ? 6 : 5)].map((__, col) => (
          <circle
            key={`${row}-${col}`}
            cx={row % 2 === 0 ? 6.3 + col * 12.6 : 12.6 + col * 12.6}
            cy={5.4 + row * 7.7}
            r="2"
          />
        ))
      ))}
    </g>
  </svg>
);

// United Kingdom Flag (Union Jack)
export const UKFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Blue background */}
    <rect width="200" height="120" fill="#012169" />
    {/* White diagonal crosses */}
    <path d="M0 0L200 120M200 0L0 120" stroke="white" strokeWidth="24" />
    {/* Red diagonal crosses */}
    <path d="M0 0L200 120M200 0L0 120" stroke="#C8102E" strokeWidth="8" />
    {/* White cross */}
    <path d="M100 0V120M0 60H200" stroke="white" strokeWidth="40" />
    {/* Red cross */}
    <path d="M100 0V120M0 60H200" stroke="#C8102E" strokeWidth="24" />
  </svg>
);

// Canada Flag
export const CanadaFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* White background */}
    <rect width="200" height="120" fill="white" />
    {/* Red bars */}
    <rect width="50" height="120" fill="#FF0000" />
    <rect x="150" width="50" height="120" fill="#FF0000" />
    {/* Maple leaf (simplified) */}
    <path
      d="M100 25L105 40H120L108 50L113 65L100 55L87 65L92 50L80 40H95L100 25Z"
      fill="#FF0000"
    />
    <rect x="97" y="55" width="6" height="20" fill="#FF0000" />
  </svg>
);

// Australia Flag
export const AustraliaFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Blue background */}
    <rect width="200" height="120" fill="#00008B" />
    {/* Union Jack in canton (simplified) */}
    <g transform="scale(0.5) translate(0, 0)">
      <rect width="100" height="60" fill="#00008B" />
      <path d="M0 0L100 60M100 0L0 60" stroke="white" strokeWidth="12" />
      <path d="M0 0L100 60M100 0L0 60" stroke="#C8102E" strokeWidth="4" />
      <path d="M50 0V60M0 30H100" stroke="white" strokeWidth="20" />
      <path d="M50 0V60M0 30H100" stroke="#C8102E" strokeWidth="12" />
    </g>
    {/* Commonwealth Star */}
    <g fill="white" transform="translate(30, 85)">
      <circle cx="0" cy="0" r="4" />
      {[0, 45, 90, 135, 180, 225, 270].map((angle, i) => (
        <circle
          key={i}
          cx={Math.cos((angle * Math.PI) / 180) * 7}
          cy={Math.sin((angle * Math.PI) / 180) * 7}
          r="2"
        />
      ))}
    </g>
    {/* Southern Cross stars (simplified) */}
    <g fill="white">
      <polygon points="140,25 142,32 149,32 143,36 145,43 140,39 135,43 137,36 131,32 138,32" />
      <polygon points="165,35 167,42 174,42 168,46 170,53 165,49 160,53 162,46 156,42 163,42" />
      <polygon points="150,55 152,62 159,62 153,66 155,73 150,69 145,73 147,66 141,62 148,62" />
      <polygon points="175,65 177,72 184,72 178,76 180,83 175,79 170,83 172,76 166,72 173,72" />
    </g>
  </svg>
);

// Global/World Icon
export const GlobalFlag: React.FC<FlagProps> = ({ className = '', width = 40, height = 26 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="20" cy="13" r="11" stroke="#2563eb" strokeWidth="2" fill="none" />
    <ellipse cx="20" cy="13" rx="5" ry="11" stroke="#2563eb" strokeWidth="1.5" fill="none" />
    <line x1="9" y1="13" x2="31" y2="13" stroke="#2563eb" strokeWidth="1.5" />
    <path d="M11 7C14 9 26 9 29 7" stroke="#2563eb" strokeWidth="1.5" fill="none" />
    <path d="M11 19C14 17 26 17 29 19" stroke="#2563eb" strokeWidth="1.5" fill="none" />
  </svg>
);

export default { USFlag, UKFlag, CanadaFlag, AustraliaFlag, GlobalFlag };
