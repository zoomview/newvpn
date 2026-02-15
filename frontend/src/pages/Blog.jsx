import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    slug: 'best-vpn-2026',
    title: 'Best VPNs in 2026: Our Top Picks',
    excerpt: 'After months of testing, we\'ve compiled the definitive list of the best VPNs for speed, security, and streaming.',
    date: '2026-02-10',
    readTime: '8 min read',
    category: 'Reviews'
  },
  {
    slug: 'vpn-for-streaming',
    title: 'Best VPNs for Streaming Netflix, Disney+, and More',
    excerpt: 'Want to access more content on your favorite streaming platforms? Here are the best VPNs for unblocking geo-restricted content.',
    date: '2026-02-05',
    readTime: '6 min read',
    category: 'Guides'
  },
  {
    slug: 'vpn-security-guide',
    title: 'VPN Security 101: What You Need to Know',
    excerpt: 'Understanding VPN encryption, protocols, and logging policies to make an informed decision about your online privacy.',
    date: '2026-01-28',
    readTime: '10 min read',
    category: 'Education'
  },
  {
    slug: 'free-vs-paid-vpn',
    title: 'Free VPN vs Paid VPN: Is It Worth Paying?',
    excerpt: 'We analyze the pros and cons of free VPN services versus paid options to help you decide what\'s right for you.',
    date: '2026-01-20',
    readTime: '5 min read',
    category: 'Comparison'
  },
  {
    slug: 'vpn-speed-optimization',
    title: 'How to Optimize Your VPN Speed',
    excerpt: 'Tips and tricks to get the best possible speeds when using a VPN, including server selection and protocol settings.',
    date: '2026-01-15',
    readTime: '7 min read',
    category: 'Guides'
  },
  {
    slug: 'vpn-for-gaming',
    title: 'Best VPNs for Gaming in 2026',
    excerpt: 'Reduce ping and protect your connection while gaming with these VPN recommendations optimized for low latency.',
    date: '2026-01-08',
    readTime: '6 min read',
    category: 'Reviews'
  }
]

function Blog() {
  return (
    <div className="container" style={{ padding: '32px 24px' }}>
      <div className="page-header">
        <h1 className="page-title">VPN Blog</h1>
        <p className="page-subtitle">Latest news, reviews, and guides about VPNs</p>
      </div>

      <div className="grid grid-3">
        {blogPosts.map((post) => (
          <Link 
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="card"
            style={{ 
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              padding: '8px 12px',
              backgroundColor: 'var(--accent-primary)',
              color: 'white',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
              marginBottom: '12px'
            }}>
              {post.category}
            </div>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--text-primary)',
              lineHeight: '1.4'
            }}>
              {post.title}
            </h3>
            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: '14px',
              marginBottom: '16px',
              flex: 1
            }}>
              {post.excerpt}
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              color: 'var(--text-muted)',
              fontSize: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                {post.date}
              </div>
              <div>{post.readTime}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blog
