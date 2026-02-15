import { Link } from 'react-router-dom'
import { Shield, Lock, Eye, Globe, ArrowRight } from 'lucide-react'

function SecurityStackWidget() {
  const securityTools = [
    {
      id: 'vpn',
      name: 'VPN',
      icon: Shield,
      color: '#06b6d4',
      link: '/',
      description: 'Encrypt your connection'
    },
    {
      id: 'password',
      name: 'Password Manager',
      icon: Lock,
      color: '#0094f5',
      link: '/reviews/password-managers',
      description: 'Secure your accounts'
    },
    {
      id: 'antivirus',
      name: 'Antivirus',
      icon: Eye,
      color: '#10b981',
      link: '/reviews/antivirus',
      description: 'Protect from malware'
    },
    {
      id: 'browser',
      name: 'Privacy Browser',
      icon: Globe,
      color: '#fb542b',
      link: '/reviews/privacy-browsers',
      description: 'Browse privately'
    }
  ]

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        marginBottom: '16px'
      }}>
        <Shield size={20} style={{ color: 'var(--accent-primary)' }} />
        <h3 style={{ fontSize: '16px', fontWeight: '600' }}>
          Complete Your Security Stack
        </h3>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
      }}>
        {securityTools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.link}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tool.color
              e.currentTarget.style.backgroundColor = `${tool.color}15`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
            }}
          >
            <tool.icon size={20} style={{ color: tool.color }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ 
                fontSize: '13px', 
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                {tool.name}
              </p>
              <p style={{ 
                fontSize: '11px', 
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {tool.description}
              </p>
            </div>
            <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SecurityStackWidget
