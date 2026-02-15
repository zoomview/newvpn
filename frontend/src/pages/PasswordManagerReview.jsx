import { Link } from 'react-router-dom'
import { ArrowLeft, Star, Check, X, Shield } from 'lucide-react'

// Password Manager reviews data
const passwordManagerReviews = {
  '1password': {
    id: '1password',
    name: '1Password',
    tagline: 'The Best Password Manager for Families',
    logo: '1P',
    color: '#0094f5',
    rating: 4.9,
    description: '1Password is our top pick for password managers. It offers excellent security features, an intuitive interface, and powerful family sharing capabilities. The Watchtower feature provides valuable security insights.',
    website: 'https://1password.com/',
    pros: [
      'Excellent family plan with sharing',
      'Watchtower security monitoring',
      'Travel mode for privacy',
      'Strong encryption (AES-256)',
      'Excellent browser extensions',
      'Great mobile apps'
    ],
    cons: [
      'No free tier',
      'Slightly more expensive'
    ],
    pricing: {
      monthly: 2.99,
      yearly: 35.88
    }
  },
  bitwarden: {
    id: 'bitwarden',
    name: 'Bitwarden',
    tagline: 'Best Free Password Manager',
    logo: 'B',
    color: '#175dcf',
    rating: 4.7,
    description: 'Bitwarden is the best free password manager available. It offers open-source transparency, excellent security, and the ability to self-host for advanced users. Perfect for budget-conscious users who want quality security.',
    website: 'https://bitwarden.com/',
    pros: [
      'Excellent free tier',
      'Open source and transparent',
      'Self-hosting option',
      'Strong encryption',
      'Great for developers',
      'Cross-platform support'
    ],
    cons: [
      'UI could be more polished',
      'Some features need paid plan'
    ],
    pricing: {
      monthly: 0,
      yearly: 10
    }
  }
}

function PasswordManagerReview() {
  const reviews = Object.values(passwordManagerReviews)

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
          Best Password Managers for VPN Users
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Pair your VPN with a secure password manager for complete online protection.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
          Why VPN Users Need a Password Manager
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          Using a VPN protects your internet connection, but weak passwords remain a major security vulnerability. 
          A password manager ensures you use strong, unique passwords for every account.
        </p>
        <ul style={{ color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Generate strong, unique passwords for every account</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Securely store and auto-fill credentials</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Monitor for compromised passwords</span>
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
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Starting from</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
                {review.pricing.monthly === 0 ? 'Free' : `$${review.pricing.monthly}`}
                {review.pricing.monthly > 0 && <span style={{ fontSize: '16px', fontWeight: '400' }}>/mo</span>}
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
              Get Started
            </a>
          </div>
        </div>
      ))}

      <div className="card" style={{ 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #06b6d422 0%, var(--bg-secondary) 100%)',
        borderColor: 'var(--accent-primary)'
      }}>
        <Shield size={40} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
          Complete Your Security Stack
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          VPN + Password Manager = Complete Online Protection
        </p>
        <Link to="/" className="btn btn-primary">
          View VPN Comparisons
        </Link>
      </div>
    </div>
  )
}

export default PasswordManagerReview
