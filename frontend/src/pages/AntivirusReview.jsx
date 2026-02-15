import { Link } from 'react-router-dom'
import { ArrowLeft, Star, Check, X, Shield } from 'lucide-react'

// Antivirus reviews data
const antivirusReviews = {
  kaspersky: {
    id: 'kaspersky',
    name: 'Kaspersky',
    tagline: 'Award-Winning Protection',
    logo: 'K',
    color: '#0063c5',
    rating: 4.6,
    description: 'Kaspersky offers comprehensive security with excellent malware detection rates. Includes a free VPN and password manager in higher-tier plans. Known for minimal system impact and frequent independent testing.',
    website: 'https://www.kaspersky.com/',
    pros: [
      'Excellent malware detection',
      'Includes free VPN',
      'Password manager included',
      'Minimal system impact',
      'Regular independent testing',
      'Affordable pricing'
    ],
    cons: [
      'Controversial history (debated)',
      'US government ban concerns',
      'Limited features on basic plan'
    ],
    pricing: {
      monthly: 4.99,
      yearly: 29.99
    }
  },
  norton: {
    id: 'norton',
    name: 'Norton',
    tagline: 'Comprehensive Security Suite',
    logo: 'N',
    color: '#f78f1e',
    rating: 4.5,
    description: 'Norton offers one of the most comprehensive security suites with cloud backup, dark web monitoring, and LifeLock identity theft protection. A trusted name in cybersecurity for decades.',
    website: 'https://www.norton.com/',
    pros: [
      'Cloud backup included',
      'Dark web monitoring',
      'LifeLock identity protection',
      'Large server network',
      'Excellent customer support',
      'Multi-device support'
    ],
    cons: [
      'More expensive',
      'Can be resource heavy',
      'Complex for beginners'
    ],
    pricing: {
      monthly: 9.99,
      yearly: 49.99
    }
  }
}

function AntivirusReview() {
  const reviews = Object.values(antivirusReviews)

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
          Best Antivirus for VPN Users
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Layer your security with a trusted antivirus alongside your VPN.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
          Why VPN Users Should Also Use Antivirus
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          While a VPN encrypts your connection and masks your IP, it does not protect against malware, phishing, or viruses. 
          Antivirus software provides essential protection against these threats that VPNs cannot address.
        </p>
        <ul style={{ color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Detect and block malware and ransomware</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Protect against phishing attacks</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Real-time threat detection</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Check size={16} style={{ color: '#10b981', marginTop: '3px' }} />
            <span>Identity theft protection (premium)</span>
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
                ${review.pricing.monthly}/mo
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
          Layer Your Security
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          VPN + Antivirus = Complete Protection
        </p>
        <Link to="/" className="btn btn-primary">
          View VPN Comparisons
        </Link>
      </div>
    </div>
  )
}

export default AntivirusReview
