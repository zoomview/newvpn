import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoIcon from './LogoIcon'
import { Menu, X } from 'lucide-react'

function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  
  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
  ]
  
  const isActive = (path) => location.pathname === path
  
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <LogoIcon />
          <span className="header-brand">VPNSpan</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Navigation */}
        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
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
