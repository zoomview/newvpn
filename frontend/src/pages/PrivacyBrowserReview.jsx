import { Link } from 'react-router-dom'
import { ArrowLeft, Star, Check, X, Shield, Globe } from 'lucide-react'

// Privacy Browser reviews data
const privacyBrowserReviews = {
  brave: {
    id: 'brave',
    name: 'Brave',
    tagline: 'The Most Private Browser by Default',
    logo: 'B',
    color: '#fb542b',
    rating: 4.8,
    description: 'Brave is our top pick for privacy-focused browsing. It blocks ads and trackers by default, offers built-in VPN (US only), and rewards users with BAT tokens for viewing privacy-respecting ads. Built on Chromium, it supports all your favorite extensions.',
    website: 'https://brave.com/',
    pros: [
      'Built-in ad and tracker blocking',
      'Private windows with Tor',
      'Brave Rewards with BAT tokens',
      'Fast browsing experience',
      'Built-in VPN (limited)',
      'Chromium-based (extension support)'
    ],
    cons: [
      'VPN only available in US',
      'Rewards system controversial',
      'Some users dislike ads even rewards-based'
    ],
    pricing: {
      free: true
    }
  },
  firefox: {
    id: 'firefox',
    name: 'Firefox',
    tagline: 'Open Source Privacy Browser',
    logo: 'F',
    color: '#ff7139',
    rating: 4.6,
    description: 'Mozilla Firefox is a powerful privacy-focused browser with excellent tracking protection. As an open-source project, it offers transparency and customization through thousands of extensions. The Enhanced Tracking Protection blocks known trackers by default.',
    website: 'https://www.mozilla.org/firefox/',
    pros: [
      'Open source and transparent',
      'Excellent tracking protection',
      'Container extensions',
      'Large extension library',
      'Regular security updates',
      'No profit from selling data'
    ],
    cons: [
      'Memory usage higher than Chrome',
      'Occasional slowdowns',
      'Less extension support than Chrome'
    ],
    pricing: {
      free: true
    }
  },
  tor: {
    id: 'tor',
    name: 'Tor Browser',
    tagline: 'Maximum Anonymity Online',
    logo: 'T',
    color: '#7d4698',
    rating: 4.3,
    description: 'Tor Browser provides the highest level of anonymity by routing your traffic through multiple relays. It\'s the go-to choice for whistleblowers, journalists, and anyone needing maximum privacy. However, speed is significantly reduced due to the layered encryption.',
    website: 'https://www.torproject.org/',
    pros: [
      'Maximum anonymity',
      'No tracking',
      'Access .onion sites',
      'Open source',
      'Blocks fingerprinting',
      'Used by journalists globally'
    ],
    cons: [
      'Much slower speeds',
      'Some sites block Tor exit nodes',
      'Not for everyday browsing',
      'Complex for average users'
    ],
    pricing: {
      free: true
    }
  }
}

function PrivacyBrowserReview() {
  const reviews = Object.values(privacyBrowserReviews)

  return (
    <div className="container" style={{ padding: '32px 24px' }}>
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

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Best Privacy Browsers for VPN Users
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Pair your VPN with a privacy-focused browser for complete online anonymity.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
          Why VPN Users Need a Privacy Browser
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          While a VPN encrypts your connection, your browser can still leak information through cookies, 
          fingerprinting, and tracking scripts. A privacy browser complements your VPN for complete protection.
        </p>
        <ul style={{ color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Block tracking scripts and ad networks</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Prevent browser fingerprinting</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Auto-delete cookies and history</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Built-in private browsing modes</span>
          </li>
        </ul>
      </div>

      {reviews.map((review) => (
        <div key={review.id} className="card" style={{ marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px', 
            marginBottom: '24px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div 
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                backgroundColor: review.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '700',
                color: 'white'
              }}
            >
              {review.logo}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px', color: review.color }}>
                {review.name}
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{review.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < Math.floor(review.rating) ? '#f59e0b' : 'transparent'} 
                      color="#f59e0b" 
                    />
                  ))}
                </div>
                <span style={{ fontWeight: '600' }}>{review.rating}/5</span>
              </div>
            </div>
            <a 
              href={review.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ 
                padding: '14px 28px', 
                fontSize: '16px',
                backgroundColor: review.color,
              }}
            >
              Get {review.name}
            </a>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px' }}>
            {review.description}
          </p>

          <div className="grid grid-2" style={{ marginBottom: '24px' }}>
            <div>
              <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={20} /> Pros
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {review.pros.map((pro, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={14} style={{ color: '#10b981', marginTop: '3px' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <X size={20} /> Cons
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {review.cons.map((con, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <X size={14} style={{ color: '#ef4444', marginTop: '3px' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ 
            padding: '20px', 
            backgroundColor: review.color,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Price</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
                {review.pricing.free ? 'Free' : `$${review.pricing.monthly}/mo`}
              </p>
            </div>
            <a 
              href={review.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: review.color,
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              Download Now
            </a>
          </div>
        </div>
      ))}

      <div className="card" style={{ 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #fb542b22 0%, var(--bg-secondary) 100%)',
        borderColor: '#fb542b'
      }}>
        <Globe size={40} style={{ color: '#fb542b', marginBottom: '16px' }} />
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
          Build Your Privacy Stack
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          VPN + Privacy Browser + Password Manager = Complete Protection
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            View VPNs
          </Link>
          <Link to="/reviews/password-managers" className="btn btn-secondary">
            Password Managers
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PrivacyBrowserReview
