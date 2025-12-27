import React from 'react';

const Logo = ({ size = 40 }) => {
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
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5a4" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="25" cy="25" r="24" fill="none" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.4" />

      {/* Inner circle background */}
      <circle cx="25" cy="25" r="22" fill="rgba(6, 182, 212, 0.08)" />

      {/* FM Text */}
      <text
        x="25"
        y="32"
        fontSize="22"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="url(#textGradient)"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        FM
      </text>
    </svg>
  );
};

export default Logo;
