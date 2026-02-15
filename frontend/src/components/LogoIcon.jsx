function LogoIcon() {
  return (
    <svg 
      width="36" 
      height="36" 
      viewBox="0 0 60 60" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="logoRibbonGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="40%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      
      {/* Flowing ribbon wave - representing span across time/space */}
      <path 
        d="M 4 45 C 14 45, 16 15, 30 19 C 44 23, 38 51, 52 45 C 60 41, 62 13, 68 9"
        stroke="url(#logoRibbonGrad)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round" 
      />
      
      {/* Data node dots - representing monitoring */}
      <circle cx="8" cy="42" r="3" fill="#00D4FF" />
      <circle cx="20" cy="25" r="2.5" fill="#3B82F6" />
      <circle cx="32" cy="32" r="3" fill="#7C3AED" />
      <circle cx="46" cy="16" r="2.5" fill="#3B82F6" />
      <circle cx="58" cy="28" r="2.5" fill="#00D4FF" />
    </svg>
  )
}

export default LogoIcon
