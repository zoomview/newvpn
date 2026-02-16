import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Zap, Clock, Check, X, Shield, Globe, Download, Smartphone, Lock, Gamepad2, Film, Eye } from 'lucide-react'
import RelatedSecurityTools from '../components/RelatedSecurityTools'

// VPN reviews data
const vpnReviews = {
  expressvpn: {
    id: 'expressvpn',
    name: 'ExpressVPN',
    tagline: 'The Industry Leader in Speed & Security',
    logo: 'E',
    color: '#c5283d',
    rating: 4.9,
    description: 'ExpressVPN is widely considered the best VPN service in the world. With blazing fast speeds, military-grade encryption, and an intuitive interface, it sets the standard for what a VPN should be.',
    website: 'https://www.expressvpn.com/',
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
      yearly: 99.95,
      currency: 'USD'
    },
    features: {
      encryption: 'AES-256-GCM',
      protocols: ['Lightway', 'OpenVPN', 'IKEv2'],
      logs: 'No logs',
      devices: '8 devices',
      streaming: ['Netflix', 'YouTube', 'Disney+', 'Hulu', 'BBC iPlayer'],
      support: '24/7 Live Chat'
    },
    stats: {
      speed: 95,
      latency: 18,
      status: 'online'
    },
    // Use cases based on user research
    bestFor: [
      { icon: 'film', label: 'Streaming', desc: 'Best Netflix & entertainment support' },
      { icon: 'shield', label: 'Privacy', desc: 'Audited no-logs policy' },
      { icon: 'globe', label: 'Travel', desc: '94 countries, reliable worldwide' }
    ]
  },
  nordvpn: {
    id: 'nordvpn',
    name: 'NordVPN',
    tagline: 'Security First with Massive Server Network',
    logo: 'N',
    color: '#4687d8',
    rating: 4.7,
    description: 'NordVPN offers the largest server network in the industry with advanced security features including Double VPN, Onion over VPN, and CyberShield. Perfect for security-conscious users.',
    website: 'https://nordvpn.com/',
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
      yearly: 59.99,
      currency: 'USD'
    },
    features: {
      encryption: 'AES-256-GCM',
      protocols: ['NordLynx', 'OpenVPN', 'IKEv2'],
      logs: 'No logs (audited)',
      devices: '6 devices',
      streaming: ['Netflix', 'YouTube', 'Disney+', 'Hulu'],
      support: '24/7 Live Chat'
    },
    stats: {
      speed: 88,
      latency: 25,
      status: 'online'
    },
    bestFor: [
      { icon: 'shield', label: 'Security', desc: 'Advanced threat protection' },
      { icon: 'film', label: 'Streaming', desc: 'Great Netflix & Disney+ support' },
      { icon: 'globe', label: 'Servers', desc: '5500+ servers worldwide' }
    ]
  },
  surfshark: {
    id: 'surfshark',
    name: 'Surfshark',
    tagline: 'Unlimited Protection at an Unbeatable Price',
    logo: 'S',
    color: '#2ee0ca',
    rating: 4.5,
    description: 'Surfshark offers unlimited device connections with excellent features at a fraction of the cost of competitors. CleanWeb, Whitelister, and MultiHop make it a powerful choice for budget-conscious users.',
    website: 'https://surfshark.com/',
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
      yearly: 47.88,
      currency: 'USD'
    },
    features: {
      encryption: 'AES-256-GCM',
      protocols: ['WireGuard', 'OpenVPN', 'IKEv2'],
      logs: 'No logs',
      devices: 'Unlimited',
      streaming: ['Netflix', 'YouTube', 'Disney+', 'Amazon Prime'],
      support: '24/7 Live Chat'
    },
    stats: {
      speed: 75,
      latency: 42,
      status: 'degraded'
    },
    bestFor: [
      { icon: 'smartphone', label: 'Families', desc: 'Unlimited device connections' },
      { icon: 'shield', label: 'Budget', desc: 'Best value for money' },
      { icon: 'film', label: 'Streaming', desc: 'Works with all major platforms' }
    ]
  },
  protonvpn: {
    id: 'protonvpn',
    name: 'ProtonVPN',
    tagline: 'Privacy-First VPN from the Makers of ProtonMail',
    logo: 'P',
    color: '#6d4aff',
    rating: 4.4,
    description: 'ProtonVPN comes from the same Swiss-based team behind ProtonMail. With a strong focus on privacy, open-source apps, and a free tier, it\'s ideal for privacy enthusiasts.',
    website: 'https://protonvpn.com/',
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
      yearly: 71.88,
      currency: 'USD'
    },
    features: {
      encryption: 'AES-256',
      protocols: ['WireGuard', 'OpenVPN'],
      logs: 'No logs',
      devices: '10 devices',
      streaming: ['Netflix', 'YouTube'],
      support: 'Email & Community'
    },
    stats: {
      speed: 65,
      latency: 55,
      status: 'online'
    },
    bestFor: [
      { icon: 'shield', label: 'Privacy', desc: 'Swiss-based, open-source' },
      { icon: 'eye', label: 'No Logs', desc: 'Independent security audits' },
      { icon: 'download', label: 'Free Tier', desc: 'Best free VPN option' }
    ]
  },
  cyberghost: {
    id: 'cyberghost',
    name: 'CyberGhost',
    tagline: 'User-Friendly VPN Optimized for Streaming',
    logo: 'C',
    color: '#714674',
    rating: 4.3,
    description: 'CyberGhost is a beginner-friendly VPN with dedicated streaming servers optimized for Netflix, Disney+, and other services. It offers great value with an intuitive interface.',
    website: 'https://cyberghost.com/',
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
      yearly: 56.94,
      currency: 'USD'
    },
    features: {
      encryption: 'AES-256',
      protocols: ['WireGuard', 'OpenVPN', 'IKEv2'],
      logs: 'No logs',
      devices: '7 devices',
      streaming: ['Netflix', 'YouTube', 'Disney+', 'Amazon Prime'],
      support: '24/7 Live Chat'
    },
    stats: {
      speed: 72,
      latency: 38,
      status: 'online'
    },
    bestFor: [
      { icon: 'film', label: 'Streaming', desc: 'Dedicated streaming servers' },
      { icon: 'smartphone', label: 'Beginners', desc: 'Easiest to use' },
      { icon: 'globe', label: 'Value', desc: '45-day money-back guarantee' }
    ]
  }
}

function VPNReview() {
  const { id } = useParams()
  const [review, setReview] = useState(null)

  useEffect(() => {
    // Try to find the review from our data
    const found = vpnReviews[id]
    if (found) {
      setReview(found)
    }
  }, [id])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalf = rating % 1 >= 0.5
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)
      } else if (i === fullStars && hasHalf) {
        stars.push(<Star key={i} size={18} fill="#f59e0b" color="#f59e0b" style={{ clipPath: 'inset(0 50% 0 0)' }} />)
      } else {
        stars.push(<Star key={i} size={18} color="#4b5563" />)
      }
    }
    return stars
  }

  if (!review) {
    return (
      <div className="container" style={{ padding: '32px', textAlign: 'center' }}>
        <p>Review not found</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '32px 24px' }}>
      {/* Back Button */}
      <Link 
        to="/" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          color: 'var(--text-secondary)',
          marginBottom: '24px'
        }}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      {/* Hero Section */}
      <div className="card" style={{ 
        marginBottom: '32px',
        background: `linear-gradient(135deg, ${review.color}22 0%, var(--bg-secondary) 100%)`,
        borderColor: review.color
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
          <div 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              backgroundColor: review.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: '700',
              color: 'white'
            }}
          >
            {review.logo}
          </div>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>{review.name}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>{review.tagline}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <div style={{ display: 'flex' }}>{renderStars(review.rating)}</div>
              <span style={{ fontWeight: '600', marginLeft: '8px' }}>{review.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Live Stats Banner */}
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          padding: '16px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} style={{ color: '#f59e0b' }} />
            <span style={{ color: 'var(--text-muted)' }}>Speed:</span>
            <strong>{review.stats.speed} Mbps</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} style={{ color: '#06b6d4' }} />
            <span style={{ color: 'var(--text-muted)' }}>Latency:</span>
            <strong>{review.stats.latency} ms</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: review.stats.status === 'online' ? '#10b981' : '#f59e0b' 
            }} />
            <strong style={{ textTransform: 'capitalize' }}>{review.stats.status}</strong>
          </div>
        </div>

        {/* CTA Button */}
        <a 
          href={review.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ 
            padding: '14px 32px', 
            fontSize: '16px',
            backgroundColor: review.color,
            width: '100%',
            justifyContent: 'center'
          }}
        >
          Get {review.name} - Special Offer
        </a>
      </div>

      {/* Description */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>About {review.name}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>{review.description}</p>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={20} /> Pros
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {review.pros.map((pro, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Check size={16} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)' }}>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <X size={20} /> Cons
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {review.cons.map((con, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <X size={16} style={{ color: '#ef4444', marginTop: '3px', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)' }}>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Pricing</h3>
        <div className="grid grid-2">
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'var(--bg-tertiary)', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Monthly Plan</p>
            <p style={{ fontSize: '32px', fontWeight: '700' }}>${review.pricing.monthly}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>per month</p>
          </div>
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'var(--accent-primary)', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>Best Value - Yearly</p>
            <p style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>${review.pricing.yearly}</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>per year (save {Math.round((1 - review.pricing.yearly / (review.pricing.monthly * 12)) * 100)}%)</p>
          </div>
        </div>
      </div>

      {/* Technical Features */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Technical Features</h3>
        <div className="grid grid-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock size={18} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Encryption</p>
                <p style={{ fontWeight: '500' }}>{review.features.encryption}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Shield size={18} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Protocols</p>
                <p style={{ fontWeight: '500' }}>{review.features.protocols.join(', ')}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Smartphone size={18} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Devices</p>
                <p style={{ fontWeight: '500' }}>{review.features.devices}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe size={18} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Streaming</p>
                <p style={{ fontWeight: '500' }}>{review.features.streaming.join(', ')}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Download size={18} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Logging Policy</p>
                <p style={{ fontWeight: '500' }}>{review.features.logs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best For - Use Cases based on research */}
      {review.bestFor && review.bestFor.length > 0 && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Best For</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {review.bestFor.map((item, index) => {
              const iconMap = {
                film: Film,
                shield: Shield,
                globe: Globe,
                smartphone: Smartphone,
                eye: Eye,
                download: Download,
                gamepad2: Gamepad2
              }
              const IconComponent = iconMap[item.icon] || Shield
              return (
                <div key={index} style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${review.color}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <IconComponent size={18} style={{ color: review.color }} />
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{item.label}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Related Security Tools */}
      <RelatedSecurityTools />
    </div>
  )
}

export default VPNReview
