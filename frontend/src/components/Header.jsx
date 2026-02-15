import { Link, useLocation } from 'react-router-dom'
import LogoIcon from './LogoIcon'

function Header() {
  const location = useLocation()
  
  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
  ]
  
  const isActive = (path) => location.pathname === path
  
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
        }}>
          <LogoIcon />
          <span style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--text-primary)',
          }}>
            VPNSpan
          </span>
        </Link>
        
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive(link.path) ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
