import React from 'react';

const Logo = ({ size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Filmon Mehari logo"
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Clean monogram */}
      <text
        x="25"
        y="31"
        fontSize="21"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="url(#logoGradient)"
        textAnchor="middle"
        letterSpacing="-1"
      >
        FM
      </text>
    </svg>
  );
};

export default Logo;
