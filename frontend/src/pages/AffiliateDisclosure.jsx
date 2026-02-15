function AffiliateDisclosure() {
  return (
    <div className="container policy-container">
      <div className="page-header">
        <h1 className="page-title">Affiliate Disclosure</h1>
        <p className="page-subtitle">Last updated: February 15, 2026</p>
      </div>

      <div className="card">
        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>Our Commitment</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            VPNSpan is committed to providing honest, unbiased VPN reviews and comparisons. Our primary goal is to help you make informed decisions about your online privacy and security.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>Affiliate Relationships</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
            VPNSpan participates in affiliate programs with VPN service providers. This means when you click on our recommended links and make a purchase, we may earn a commission at <strong>no additional cost to you</strong>.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            These affiliate partnerships help support our platform and allow us to continue providing free monitoring services and unbiased reviews.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>Our Review Process</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
            Our reviews are based on:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '24px' }}>
            <li>Real-world speed and performance testing</li>
            <li>Security feature analysis</li>
            <li>Privacy policy evaluation</li>
            <li>Customer support experience</li>
            <li>Value for money assessment</li>
          </ul>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '16px' }}>
            <strong>We do not let affiliate relationships influence our reviews.</strong> We test and recommend VPNs based on actual performance and features, not commission rates.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>Transparency</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            We believe in full transparency. Every review page clearly indicates that we may earn a commission if you make a purchase through our links. This comes at no extra cost to you.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '14px' }}>Questions?</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            If you have any questions about our affiliate relationships or review process, please contact us.
          </p>
        </section>
      </div>
    </div>
  )
}

export default AffiliateDisclosure
