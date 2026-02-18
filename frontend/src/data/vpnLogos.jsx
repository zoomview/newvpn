// VPN Logos - Using actual brand logo images
// Note: This is nominative fair use - we're comparing/reviewing these services

export const vpnLogos = {
  expressvpn: {
    name: 'ExpressVPN',
    color: '#E51E28', // Official ExpressVPN red
    image: '/logos/expressVPN.png'
  },
  nordvpn: {
    name: 'NordVPN', 
    color: '#4687D8', // Official NordVPN blue
    image: '/logos/NordVPN.png'
  },
  surfshark: {
    name: 'Surfshark',
    color: '#23A8F0', // Official Surfshark cyan
    image: '/logos/Surfshark.jpg'
  },
  protonvpn: {
    name: 'ProtonVPN',
    color: '#6D4AFF', // Official Proton purple
    image: '/logos/ProtonVPN.png'
  },
  cyberghost: {
    name: 'CyberGhost',
    color: '#714674', // Official CyberGhost purple
    image: '/logos/CyberGhost.png'
  }
}

// Streaming support based on user research - key pain point
export const vpnStreaming = {
  expressvpn: {
    netflix: true,
    youtube: true,
    disney: true,
    hulu: true,
    bbc: true,
    rating: 5 // Expert rating for streaming
  },
  nordvpn: {
    netflix: true,
    youtube: true,
    disney: true,
    hulu: true,
    bbc: true,
    rating: 5
  },
  surfshark: {
    netflix: true,
    youtube: true,
    disney: true,
    hulu: true,
    bbc: true,
    rating: 4
  },
  protonvpn: {
    netflix: true,
    youtube: true,
    disney: false,
    hulu: false,
    bbc: true,
    rating: 3 // Limited on free tier
  },
  cyberghost: {
    netflix: true,
    youtube: true,
    disney: true,
    hulu: true,
    bbc: true,
    rating: 4 // Has dedicated streaming servers
  }
}

// Privacy audit status - key decision factor from research
export const vpnPrivacy = {
  expressvpn: {
    audited: true,
    auditor: 'PwC',
    lastAudit: '2024',
    logs: 'No logs',
    jurisdiction: 'British Virgin Islands'
  },
  nordvpn: {
    audited: true,
    auditor: 'Deloitte',
    lastAudit: '2024',
    logs: 'No logs',
    jurisdiction: 'Panama'
  },
  surfshark: {
    audited: true,
    auditor: 'Deloitte',
    lastAudit: '2023',
    logs: 'No logs',
    jurisdiction: 'Netherlands'
  },
  protonvpn: {
    audited: true,
    auditor: 'Securitum',
    lastAudit: '2024',
    logs: 'No logs',
    jurisdiction: 'Switzerland'
  },
  cyberghost: {
    audited: true,
    auditor: 'Deloitte',
    lastAudit: '2022',
    logs: 'No logs',
    jurisdiction: 'Romania'
  }
}

// VPN review data with real logos
export const vpnReviews = {
  expressvpn: {
    id: 'expressvpn',
    name: 'ExpressVPN',
    tagline: 'The Industry Leader in Speed & Security',
    logo: '/logos/expressVPN.png',
    color: '#E51E28',
    website: 'https://www.expressvpn.com/',
    affiliateLink: 'https://www.expressvpn.com/', // Replace with affiliate link
    rating: 4.9,
    description: 'ExpressVPN is widely considered the best VPN service in the world. With blazing fast speeds, military-grade encryption, and an intuitive interface, it sets the standard for what a VPN should be.',
    pros: [
      'Fastest speeds in the industry',
      '3000+ servers in 94 countries',
      'Military-grade AES-256 encryption',
      'No logs policy (audited)',
      'Excellent streaming support',
      '24/7 live chat support'
    ],
    cons: [
      'Slightly more expensive',
      'Limited to 8 devices'
    ],
    pricing: {
      monthly: 12.95,
      yearly: 99.95
    },
    features: {
      encryption: 'AES-256-GCM',
      protocols: ['Lightway', 'OpenVPN', 'IKEv2'],
      logs: 'No logs',
      devices: '8 devices'
    }
  },
  nordvpn: {
    id: 'nordvpn',
    name: 'NordVPN',
    tagline: 'Security First with Massive Server Network',
    logo: '/logos/NordVPN.png',
    color: '#4687D8',
    website: 'https://nordvpn.com/',
    affiliateLink: 'https://nordvpn.com/',
    rating: 4.7,
    description: 'NordVPN offers the largest server network in the industry with advanced security features including Double VPN, Onion over VPN, and CyberShield. Perfect for security-conscious users.',
    pros: [
      '5500+ servers worldwide',
      'Advanced security features',
      'Double VPN protection',
      'Built-in ad blocker',
      'Great for streaming',
      '6 simultaneous connections'
    ],
    cons: [
      'Desktop app can be slow',
      'Inconsistent speeds sometimes'
    ],
    pricing: {
      monthly: 11.99,
      yearly: 59.99
    },
    features: {
      encryption: 'AES-256-GCM',
      protocols: ['NordLynx', 'OpenVPN', 'IKEv2'],
      logs: 'No logs (audited)',
      devices: '6 devices'
    }
  },
  surfshark: {
    id: 'surfshark',
    name: 'Surfshark',
    tagline: 'Unlimited Protection at an Unbeatable Price',
    logo: '/logos/Surfshark.jpg',
    color: '#23A8F0',
    website: 'https://surfshark.com/',
    affiliateLink: 'https://surfshark.com/',
    rating: 4.5,
    description: 'Surfshark offers unlimited device connections with excellent features at a fraction of the cost of competitors. CleanWeb, Whitelister, and MultiHop make it a powerful choice for budget-conscious users.',
    pros: [
      'Unlimited device connections',
      'Very affordable pricing',
      'CleanWeb ad blocker',
      'MultiHop servers',
      'NoBorders mode for restricted regions',
      'Great streaming support'
    ],
    cons: [
      'Smaller server network',
      'Some servers can be slow'
    ],
    pricing: {
      monthly: 15.95,
      yearly: 47.88
    },
    features: {
      encryption: 'AES-256-GCM',
      protocols: ['WireGuard', 'OpenVPN', 'IKEv2'],
      logs: 'No logs',
      devices: 'Unlimited'
    }
  },
  protonvpn: {
    id: 'protonvpn',
    name: 'ProtonVPN',
    tagline: 'Privacy-First VPN from the Makers of ProtonMail',
    logo: '/logos/ProtonVPN.png',
    color: '#6D4AFF',
    website: 'https://protonvpn.com/',
    affiliateLink: 'https://protonvpn.com/',
    rating: 4.4,
    description: 'ProtonVPN comes from the same Swiss-based team behind ProtonMail. With a strong focus on privacy, open-source apps, and a free tier, it\'s ideal for privacy enthusiasts.',
    pros: [
      'Swiss-based (strong privacy laws)',
      'Free tier available',
      'Open-source apps',
      'Secure Core servers',
      'No-logs policy',
      'Tor over VPN'
    ],
    cons: [
      'Smaller server network',
      'Speeds can vary',
      'Limited streaming support on free tier'
    ],
    pricing: {
      monthly: 4.99,
      yearly: 71.88
    },
    features: {
      encryption: 'AES-256',
      protocols: ['WireGuard', 'OpenVPN'],
      logs: 'No logs',
      devices: '10 devices'
    }
  },
  cyberghost: {
    id: 'cyberghost',
    name: 'CyberGhost',
    tagline: 'User-Friendly VPN Optimized for Streaming',
    logo: '/logos/CyberGhost.png',
    color: '#714674',
    website: 'https://cyberghost.com/',
    affiliateLink: 'https://cyberghost.com/',
    rating: 4.3,
    description: 'CyberGhost is a beginner-friendly VPN with dedicated streaming servers optimized for Netflix, Disney+, and other popular services. It offers great value with an intuitive interface.',
    pros: [
      'Dedicated streaming servers',
      'Very user-friendly',
      '9000+ servers worldwide',
      '45-day money-back guarantee',
      'No logs policy',
      '7 simultaneous connections'
    ],
    cons: [
      'Based in Romania (some privacy concerns)',
      'Speed inconsistencies',
      'Limited advanced features'
    ],
    pricing: {
      monthly: 12.99,
      yearly: 56.94
    },
    features: {
      encryption: 'AES-256',
      protocols: ['WireGuard', 'OpenVPN', 'IKEv2'],
      logs: 'No logs',
      devices: '7 devices'
    }
  }
}

// Get VPN logo component with image
export function VPNLogo({ vpnId, size = 40 }) {
  const vpn = vpnLogos[vpnId]
  if (!vpn) return null
  
  return (
    <img 
      src={vpn.image} 
      alt={vpn.name}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '8px',
        objectFit: 'contain',
        backgroundColor: 'white',
        padding: '2px'
      }}
    />
  )
}

export default vpnLogos
