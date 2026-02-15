import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import VPNDetail from './pages/VPNDetail'
import VPNReview from './pages/VPNReview'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

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
                    </Routes>
                </main>
                <footer style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderTop: '1px solid var(--border-color)',
                    padding: '24px',
                    textAlign: 'center',
                    marginTop: 'auto'
                }}>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                        VPNSpan © 2026 - Real-time VPN Performance Monitoring
                    </p>
                </footer>
            </div>
        </Router>
    )
}

export default App
