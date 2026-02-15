function Privacy() {
  return (
    <div className="container" style={{ padding: '32px 24px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">Last updated: February 14, 2026</p>
      </div>

      <div className="card">
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Information We Collect</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
            VPNSpan is a monitoring platform that collects and displays VPN performance data. We do not collect personal information from our users.
          </p>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Automatically Collected Information:</h3>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referral source</li>
            <li>Pages visited</li>
            <li>Time and date of visits</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>How We Use Your Information</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            The information we collect is used to:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '20px', marginTop: '12px' }}>
            <li>Improve our website and user experience</li>
            <li>Analyze traffic patterns and site usage</li>
            <li>Maintain the security of our platform</li>
            <li>Generate aggregate statistics for performance monitoring</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            We use cookies to enhance your browsing experience. You can control or delete cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Third-Party Services</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            We may use third-party services for analytics and website performance monitoring. These services have their own privacy policies and data handling practices.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Contact Us</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
