import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '120px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px',
        lineHeight: 1
      }}>
        404
      </h1>
      
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: '12px'
      }}>
        Page Not Found
      </h2>
      
      <p style={{
        color: 'var(--text-muted)',
        marginBottom: '32px',
        maxWidth: '400px'
      }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={18} />
          Go Home
        </Link>
        <Link to="/blog" className="btn btn-secondary">
          <Search size={18} />
          Browse Blog
        </Link>
      </div>
    </div>
  )
}

export default NotFound
