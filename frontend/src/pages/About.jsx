import { Link } from 'react-router-dom'
import { Shield, Zap, TrendingUp, Users } from 'lucide-react'

function About() {
  return (
    <div className="container" style={{ padding: '32px 24px', maxWidth: '900px' }}>
      <div className="page-header">
        <h1 className="page-title">About VPNSpan</h1>
        <p className="page-subtitle">Empowering users to make informed VPN decisions</p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '16px', marginBottom: '24px' }}>
          VPNSpan is a real-time VPN performance monitoring platform designed to help users make informed decisions about their VPN choices. We continuously test and monitor major VPN services to provide accurate, unbiased performance data.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '16px' }}>
          Our mission is to simplify the VPN selection process by providing transparent, data-driven insights into VPN performance, security features, and streaming capabilities.
        </p>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>What We Do</h2>

      <div className="grid grid-2" style={{ marginBottom: '32px' }}>
        <div className="card">
          <Shield size={32} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Performance Monitoring</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            We run automated speed and latency tests every 30 minutes to ensure our data reflects real-world VPN performance.
          </p>
        </div>

        <div className="card">
          <Zap size={32} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Streaming Tests</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            We verify VPN ability to unblock Netflix, YouTube, Disney+, and other popular streaming services.
          </p>
        </div>

        <div className="card">
          <TrendingUp size={32} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Historical Data</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Track VPN performance over time with 24-hour and 7-day trend charts to identify patterns.
          </p>
        </div>

        <div className="card">
          <Users size={32} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Unbiased Reviews</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Our in-depth reviews cover pros, cons, pricing, and technical features to help you choose the right VPN.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Affiliate Disclosure</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '14px' }}>
          VPNSpan participates in affiliate programs. When you click on links to VPN services and make a purchase, we may earn a commission at no additional cost to you. This helps support our platform and allows us to continue providing free monitoring services.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '16px' }}>
          See our <Link to="/affiliate-disclosure" style={{ color: '#00D4FF' }}>Affiliate Disclosure</Link> for full details about our review process and commitment to objectivity.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '16px' }}>
          Contact: <a href="mailto:contact@vpnspan.com" style={{ color: '#00D4FF' }}>contact@vpnspan.com</a>
        </p>
      </div>
    </div>
  )
}

export default About
