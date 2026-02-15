import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Share2 } from 'lucide-react'

const blogContent = {
  'best-vpn-2026': {
    title: 'Best VPNs in 2026: Our Top Picks',
    date: '2026-02-10',
    readTime: '8 min read',
    category: 'Reviews',
    content: `
      <p>After months of rigorous testing across multiple locations and time zones, we've compiled our definitive list of the best VPNs in 2026. Whether you need blazing fast speeds for streaming, maximum security for privacy, or the best value for budget-conscious users, we've got you covered.</p>

      <h2>1. ExpressVPN - The Industry Leader</h2>
      <p>ExpressVPN continues to dominate the VPN landscape with its exceptional combination of speed, security, and ease of use. With servers in 94 countries and their proprietary Lightway protocol, ExpressVPN delivers consistent high-speed connections that are perfect for 4K streaming and gaming.</p>
      <p>Their no-logs policy has been independently audited, and they're based in the British Virgin Islands, far from invasive surveillance alliances. While slightly more expensive than competitors, the premium experience justifies the cost.</p>

      <h2>2. NordVPN - The Security Powerhouse</h2>
      <p>NordVPN offers the largest server network in the industry with over 5,500 servers worldwide. Their advanced security features including Double VPN, Onion over VPN, and CyberShield make them the go-to choice for security-conscious users.</p>
      <p>The NordLynx protocol (built on WireGuard) provides excellent speeds while maintaining strong encryption. Their Threat Protection feature blocks ads and malware at the network level, adding extra value to your subscription.</p>

      <h2>3. Surfshark - Best Value</h2>
      <p>Surfshark has revolutionized the VPN market by offering unlimited device connections at competitive prices. Despite being younger than competitors, they've rapidly expanded their server network and now offer 3,200+ servers in 100 countries.</p>
      <p>Their CleanWeb feature blocks ads, trackers, and malware, while MultiHop allows you to route your connection through multiple countries for enhanced privacy. The NoBorders mode is particularly useful for users in restrictive regions.</p>

      <h2>4. ProtonVPN - Privacy First</h2>
      <p>For users who prioritize privacy above all else, ProtonVPN is the clear choice. Built by the same team behind ProtonMail, this Swiss-based VPN offers unique features like Secure Core servers that route traffic through hardened data centers.</p>
      <p>Their free tier is the most generous in the industry, making ProtonVPN accessible to everyone. All apps are open-source and have been independently audited, ensuring complete transparency.</p>

      <h2>5. CyberGhost - Streaming Optimized</h2>
      <p>CyberGhost excels at one thing: making streaming easy. With dedicated servers optimized for Netflix, Disney+, Amazon Prime, and more, you can reliably access geo-blocked content from anywhere in the world.</p>
      <p>Their 9,000+ server network is one of the largest, and the user-friendly interface makes it perfect for VPN beginners. The 45-day money-back guarantee is the longest in the industry.</p>

      <h2>Our Testing Methodology</h2>
      <p>We test VPNs on multiple criteria including connection speeds, latency, reliability, streaming capabilities, security features, and customer support. Each VPN undergoes weeks of real-world testing across different devices and network conditions.</p>
    `
  },
  'vpn-for-streaming': {
    title: 'Best VPNs for Streaming Netflix, Disney+, and More',
    date: '2026-02-05',
    readTime: '6 min read',
    category: 'Guides',
    content: `
      <p>Streaming platforms like Netflix, Disney+, and Hulu use geo-blocking to restrict content based on your location. A VPN can help you bypass these restrictions and access content from around the world.</p>

      <h2>Why You Need a VPN for Streaming</h2>
      <p>Different countries have different content libraries. US Netflix has different shows than UK Netflix or Japan Netflix. A VPN allows you to virtually relocate your connection to access these different libraries.</p>

      <h2>Best VPNs for Streaming</h2>
      <p><strong>ExpressVPN</strong> - Works with Netflix, Disney+, HBO Max, and more. Fast speeds for 4K streaming.</p>
      <p><strong>NordVPN</strong> - SmartPlay feature automatically connects you to the best server for streaming.</p>
      <p><strong>CyberGhost</strong> - Dedicated streaming servers labeled by platform for one-click connection.</p>
      <p><strong>Surfshark</strong> - Unlimited devices means everyone in your household can stream simultaneously.</p>

      <h2>How to Use a VPN for Streaming</h2>
      <p>1. Choose a VPN provider from our list<br/>
         2. Download and install the app<br/>
         3. Connect to a server in your desired country<br/>
         4. Open your streaming service and enjoy!</p>
    `
  },
  'vpn-security-guide': {
    title: 'VPN Security 101: What You Need to Know',
    date: '2026-01-28',
    readTime: '10 min read',
    category: 'Education',
    content: `
      <p>Understanding VPN security is crucial for making informed decisions about your online privacy. Let's break down the key concepts.</p>

      <h2>Encryption</h2>
      <p>VPNs use encryption to protect your data from prying eyes. AES-256 encryption is the gold standard - it's military-grade and considered unbreakable with current technology.</p>

      <h2>Protocols</h2>
      <p>VPN protocols determine how your data is transmitted. Modern protocols like WireGuard and Lightway offer the best balance of speed and security. OpenVPN is the open-source standard, while IKEv2 is great for mobile devices.</p>

      <h2>Logging Policies</h2>
      <p>A "no-logs" policy means the VPN doesn't store information about your online activities. Look for VPNs with independent audits to verify these claims.</p>

      <h2>Kill Switch</h2>
      <p>A kill switch automatically disconnects your internet if the VPN connection drops, preventing your real IP address from being exposed.</p>
    `
  }
}

function BlogPost() {
  const { slug } = useParams()
  const post = blogContent[slug] || {
    title: 'Article Not Found',
    date: '',
    readTime: '',
    category: '',
    content: '<p>The article you are looking for does not exist.</p>'
  }

  return (
    <div className="container" style={{ padding: '32px 24px', maxWidth: '800px' }}>
      <Link 
        to="/blog" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          color: 'var(--text-secondary)',
          marginBottom: '32px'
        }}
      >
        <ArrowLeft size={18} />
        Back to Blog
      </Link>

      <article>
        <div style={{
          padding: '8px 12px',
          backgroundColor: 'var(--accent-primary)',
          color: 'white',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginBottom: '16px'
        }}>
          {post.category}
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px', lineHeight: '1.2' }}>
          {post.title}
        </h1>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          color: 'var(--text-muted)',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {post.date}
          </div>
          <span>{post.readTime}</span>
          <button style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Share2 size={14} />
            Share
          </button>
        </div>

        <div 
          style={{ 
            color: 'var(--text-secondary)', 
            lineHeight: '1.8',
            fontSize: '16px'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}

export default BlogPost
