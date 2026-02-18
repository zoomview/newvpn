// VPN Value Data - Pricing, deals, and official info
// This file is designed to be synced with VPN official websites in the future
// Data structure supports API-based updates for automation

export const vpnValueData = {
  expressvpn: {
    id: 'expressvpn',
    name: 'ExpressVPN',
    officialWebsite: 'https://www.expressvpn.com',
    affiliateLink: 'https://www.expressvpn.com',
    lastSync: '2026-02-15',
    
    // Pricing data - can be synced from official website
    pricing: {
      currency: 'USD',
      plans: [
        {
          name: 'Monthly',
          price: 12.95,
          billing: 'monthly',
          save: null
        },
        {
          name: 'Annual',
          price: 99.95,
          billing: 'yearly',
          savings: '35%',
          popular: true
        }
      ],
      moneyBack: '30 days'
    },
    
    // Current deals/promotions
    deals: {
      active: true,
      title: 'Get 35% off',
      description: 'Special discount for new users',
      expires: '2026-03-31'
    },
    
    // Official features - can be synced
    features: {
      servers: { count: '3,000+', countries: '94' },
      devices: 8,
      protocols: ['Lightway', 'OpenVPN', 'IKEv2'],
      encryption: 'AES-256-GCM',
      streaming: ['Netflix', 'Disney+', 'HBO Max', 'Amazon Prime', 'BBC iPlayer'],
      support: '24/7 Live Chat',
      moneyBack: '30 days'
    },
    
    // Rating (our independent rating)
    rating: {
      overall: 4.9,
      speed: 95,
      security: 5,
      privacy: 5,
      value: 4
    }
  },
  
  nordvpn: {
    id: 'nordvpn',
    name: 'NordVPN',
    officialWebsite: 'https://nordvpn.com',
    affiliateLink: 'https://nordvpn.com',
    lastSync: '2026-02-15',
    
    pricing: {
      currency: 'USD',
      plans: [
        {
          name: 'Monthly',
          price: 11.99,
          billing: 'monthly',
          save: null
        },
        {
          name: '2-Year',
          price: 59.99,
          billing: '2years',
          savings: '68%',
          popular: true
        }
      ],
      moneyBack: '30 days'
    },
    
    deals: {
      active: true,
      title: 'Save 68% + 3 months free',
      description: 'Best value deal',
      expires: '2026-03-15'
    },
    
    features: {
      servers: { count: '5,500+', countries: '60' },
      devices: 6,
      protocols: ['NordLynx', 'OpenVPN', 'IKEv2'],
      encryption: 'AES-256-GCM',
      streaming: ['Netflix', 'Disney+', 'HBO Max', 'Amazon Prime'],
      support: '24/7 Live Chat',
      moneyBack: '30 days'
    },
    
    rating: {
      overall: 4.7,
      speed: 88,
      security: 5,
      privacy: 5,
      value: 4
    }
  },
  
  surfshark: {
    id: 'surfshark',
    name: 'Surfshark',
    officialWebsite: 'https://surfshark.com',
    affiliateLink: 'https://surfshark.com',
    lastSync: '2026-02-15',
    
    pricing: {
      currency: 'USD',
      plans: [
        {
          name: 'Monthly',
          price: 15.95,
          billing: 'monthly',
          save: null
        },
        {
          name: '2-Year',
          price: 47.88,
          billing: '2years',
          savings: '82%',
          popular: true
        }
      ],
      moneyBack: '30 days'
    },
    
    deals: {
      active: true,
      title: 'Get 82% off',
      description: 'Best budget VPN deal',
      expires: '2026-03-31'
    },
    
    features: {
      servers: { count: '3,200+', countries: '100' },
      devices: 'Unlimited',
      protocols: ['WireGuard', 'OpenVPN', 'IKEv2'],
      encryption: 'AES-256-GCM',
      streaming: ['Netflix', 'Disney+', 'Amazon Prime', 'Hulu'],
      support: '24/7 Live Chat',
      moneyBack: '30 days'
    },
    
    rating: {
      overall: 4.5,
      speed: 75,
      security: 4,
      privacy: 4,
      value: 5
    }
  },
  
  protonvpn: {
    id: 'protonvpn',
    name: 'ProtonVPN',
    officialWebsite: 'https://protonvpn.com',
    affiliateLink: 'https://protonvpn.com',
    lastSync: '2026-02-15',
    
    pricing: {
      currency: 'USD',
      plans: [
        {
          name: 'Free',
          price: 0,
          billing: 'free',
          save: null
        },
        {
          name: 'Plus',
          price: 9.99,
          billing: 'monthly',
          save: null
        },
        {
          name: 'Plus 2-Year',
          price: 71.88,
          billing: '2years',
          savings: '50%',
          popular: true
        }
      ],
      moneyBack: '30 days (paid plans)'
    },
    
    deals: {
      active: true,
      title: '50% off + Free Privacy Bundle',
      description: 'Limited time offer',
      expires: '2026-02-28'
    },
    
    features: {
      servers: { count: '3,000+', countries: '70' },
      devices: 10,
      protocols: ['WireGuard', 'OpenVPN'],
      encryption: 'AES-256',
      streaming: ['Netflix', 'YouTube'],
      support: 'Email & Community',
      moneyBack: '30 days'
    },
    
    rating: {
      overall: 4.4,
      speed: 65,
      security: 5,
      privacy: 5,
      value: 4
    }
  },
  
  cyberghost: {
    id: 'cyberghost',
    name: 'CyberGhost',
    officialWebsite: 'https://www.cyberghostvpn.com',
    affiliateLink: 'https://www.cyberghostvpn.com',
    lastSync: '2026-02-15',
    
    pricing: {
      currency: 'USD',
      plans: [
        {
          name: 'Monthly',
          price: 12.99,
          billing: 'monthly',
          save: null
        },
        {
          name: '2-Year',
          price: 56.94,
          billing: '2years',
          savings: '82%',
          popular: true
        }
      ],
      moneyBack: '45 days'
    },
    
    deals: {
      active: true,
      title: '82% off + Free Premium',
      description: 'Best streaming VPN deal',
      expires: '2026-03-31'
    },
    
    features: {
      servers: { count: '9,000+', countries: '91' },
      devices: 7,
      protocols: ['WireGuard', 'OpenVPN', 'IKEv2'],
      encryption: 'AES-256',
      streaming: ['Netflix', 'Disney+', 'Amazon Prime', 'HBO Max'],
      support: '24/7 Live Chat',
      moneyBack: '45 days'
    },
    
    rating: {
      overall: 4.3,
      speed: 72,
      security: 4,
      privacy: 4,
      value: 4
    }
  }
}

// Function to get deal info for display
export function getVPNDeal(vpnId) {
  const vpn = vpnValueData[vpnId]
  if (!vpn || !vpn.deals.active) return null
  return vpn.deals
}

// Function to get pricing for display  
export function getVPNPricing(vpnId) {
  const vpn = vpnValueData[vpnId]
  if (!vpn) return null
  return vpn.pricing
}

// Sync status check
export function getSyncStatus(vpnId) {
  const vpn = vpnValueData[vpnId]
  if (!vpn) return null
  
  const lastSync = new Date(vpn.lastSync)
  const now = new Date()
  const daysSinceSync = Math.floor((now - lastSync) / (1000 * 60 * 60 * 24))
  
  return {
    lastSync: vpn.lastSync,
    daysAgo: daysSinceSync,
    needsSync: daysSinceSync > 7 // Flag if data is older than 7 days
  }
}

export default vpnValueData
