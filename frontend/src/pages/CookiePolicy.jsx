function CookiePolicy() {
  return (
    <div className="container policy-container">
      <div className="page-header">
        <h1 className="page-title">Cookie Policy</h1>
        <p className="page-subtitle">Last updated: February 15, 2026</p>
      </div>

      <div className="card">
        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>What Are Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Cookies are small text files stored on your device when you visit websites. They help the site remember your preferences and improve your browsing experience.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>How We Use Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
            VPNSpan uses cookies for the following purposes:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '24px' }}>
            <li><strong>Essential Cookies</strong> - Required for the website to function properly</li>
            <li><strong>Analytics Cookies</strong> - Help us understand how visitors use our site</li>
            <li><strong>Functionality Cookies</strong> - Remember your preferences</li>
          </ul>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>Managing Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
            You can control or delete cookies through your browser settings:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '24px' }}>
            <li><strong>Chrome:</strong> Settings → Privacy → Clear browsing data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Privacy & services → Clear browsing data</li>
          </ul>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>Third-Party Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Some cookies are set by third-party services we use, such as analytics tools. These third parties have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>Contact Us</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            If you have questions about our Cookie Policy, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  )
}

export default CookiePolicy
