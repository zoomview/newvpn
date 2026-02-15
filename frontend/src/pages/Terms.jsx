function Terms() {
  return (
    <div className="container" style={{ padding: '32px 24px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1 className="page-title">Terms of Service</h1>
        <p className="page-subtitle">Last updated: February 14, 2026</p>
      </div>

      <div className="card">
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Acceptance of Terms</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            By accessing and using VPNSpan, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Use License</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
            Permission is granted to temporarily use VPNSpan for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            You may not:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '20px', marginTop: '12px' }}>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Transfer the materials to another person</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Disclaimer</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            The materials on VPNSpan are provided "as is". VPNSpan makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Accuracy of Information</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            The information on VPNSpan is for general information purposes only. We strive to provide accurate and up-to-date information, but we cannot guarantee that all information is complete, accurate, or current at all times.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Affiliate Links</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            VPNSpan contains affiliate links to VPN services. This means we may receive a commission when you click on links and make a purchases. This comes at no additional cost to you. Our reviews are based on our own testing and opinions.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Contact</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            If you have any questions about these Terms of Service, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Terms
