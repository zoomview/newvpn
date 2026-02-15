import { Link } from 'react-router-dom'
import { Shield, Star, Lock } from 'lucide-react'
import { relatedProducts } from '../data/relatedProducts'

function RelatedSecurityTools() {
  const allProducts = [
    ...relatedProducts.passwordManagers.products,
    ...relatedProducts.antivirus.products,
    ...relatedProducts.browsers.products
  ].slice(0, 4)

  const isInternalLink = (url) => url.startsWith('/')

  const ProductCard = ({ product }) => {
    const content = (
      <div
        className="card"
        style={{
          padding: '20px',
          textAlign: 'center',
          transition: 'all 0.2s ease',
          border: '1px solid var(--border-color)',
          cursor: 'pointer',
          height: '100%'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.borderColor = product.color
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.borderColor = 'var(--border-color)'
        }}
      >
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: product.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '700',
            color: 'white',
            margin: '0 auto 12px'
          }}
        >
          {product.logo}
        </div>
        
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          marginBottom: '4px',
          color: product.color
        }}>
          {product.name}
        </h3>
        
        <p style={{ 
          fontSize: '12px', 
          color: 'var(--text-muted)',
          marginBottom: '12px'
        }}>
          {product.tagline}
        </p>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '4px',
          marginBottom: '12px'
        }}>
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span style={{ fontSize: '13px', fontWeight: '500' }}>{product.rating}</span>
        </div>

        <div style={{ 
          fontSize: '11px', 
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px'
        }}>
          <Lock size={12} />
          {product.price}
        </div>
      </div>
    )

    if (isInternalLink(product.url)) {
      return (
        <Link to={product.url} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          {content}
        </Link>
      )
    }

    return (
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        {content}
      </a>
    )
  }

  return (
    <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <Shield size={28} style={{ color: 'var(--accent-primary)' }} />
          Complete Your Security Stack
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          VPN protects your connection, but these tools add extra layers of protection. 
          Our editors recommend these products that work perfectly with your VPN.
        </p>
      </div>

      <div className="grid grid-4" style={{ gap: '16px' }}>
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Link 
          to="/reviews/password-managers"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent-primary)',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          View all security tools
          <Shield size={16} />
        </Link>
      </div>
    </div>
  )
}

export default RelatedSecurityTools
