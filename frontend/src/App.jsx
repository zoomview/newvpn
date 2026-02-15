import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import VPNDetail from './pages/VPNDetail'
import VPNReview from './pages/VPNReview'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import CookiePolicy from './pages/CookiePolicy'
import AffiliateDisclosure from './pages/AffiliateDisclosure'
import NotFound from './pages/NotFound'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">VPNSpan</span>
          <p className="footer-tagline">Real-time VPN Performance Monitoring</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Navigation</h4>
            <Link to="/">Dashboard</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
          </div>
          
          <div className="footer-column">
            <h4>VPN Reviews</h4>
            <Link to="/reviews/surfshark">Surfshark</Link>
            <Link to="/reviews/expressvpn">ExpressVPN</Link>
            <Link to="/reviews/nordvpn">NordVPN</Link>
            <Link to="/reviews/protonvpn">ProtonVPN</Link>
            <Link to="/reviews/cyberghost">CyberGhost</Link>
          </div>
          
          <div className="footer-column">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
            <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} VPNSpan. All rights reserved.</p>
        <p className="footer-disclaimer">
          VPNSpan is an independent comparison platform. We may earn commissions from VPN services reviewed on this site.
        </p>
        <p className="footer-contact">
          Contact: <a href="mailto:contact@vpnspan.com">contact@vpnspan.com</a>
        </p>
        <p className="footer-purchase">
          All VPN services tested on VPNSpan are self-purchased. We do not accept any payments or benefits from VPN providers that could influence our reviews or test results.
        </p>
      </div>
    </footer>
  )
}

function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/vpn/:id" element={<VPNDetail />} />
                        <Route path="/reviews/:id" element={<VPNReview />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/cookie-policy" element={<CookiePolicy />} />
                        <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
