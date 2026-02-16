import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, X, Zap, Shield, Film, DollarSign, Headphones, Wifi, Clock, Server, Globe } from 'lucide-react'
import VPNRadarChart, { vpnRadarData, vpnDimensions, vpnColors } from '../components/VPNRadarChart'
import { VPNLogo } from '../data/vpnLogos'

// VPN detailed comparison data
const vpnComparisonData = {
  expressvpn: {
    id: 'expressvpn',
    name: 'ExpressVPN',
    logo: 'EV',
    color: '#E51E28',
    website: 'https://www.expressvpn.com',
    
    // Ratings (out of 5)
    ratings: {
      speed: 4.9,
      stability: 4.5,
      privacy: 4.9,
      streaming: 4.9,
      value: 3.5,
      support: 4.8
    },
    
    // Features
    features: {
      servers: '3,000+',
      countries: '94',
      devices: 8,
      protocols: ['Lightway', 'OpenVPN', 'IKEv2'],
      encryption: 'AES-256-GCM',
      streaming: ['Netflix', 'Disney+', 'HBO Max', 'Amazon Prime', 'BBC iPlayer'],
      killswitch: true,
      splitTunneling: true,
      adBlocker: false,
      doubleVPN: false,
      tor: false,
      dedicatedIP: false,
      support24: true,
      moneyBack: '30 days'
    },
    
    // Pricing
    pricing: {
      monthly: 12.95,
      yearly: 99.95,
      currency: 'USD'
    }
  },
  
  nordvpn: {
    id: 'nordvpn',
    name: 'NordVPN',
    logo: 'N',
    color: '#4687D8',
    website: 'https://nordvpn.com',
    
    ratings: {
      speed: 4.6,
      stability: 4.3,
      privacy: 4.8,
      streaming: 4.6,
      value: 4.0,
      support: 4.5
    },
    
    features: {
      servers: '5,500+',
      countries: '60',
      devices: 6,
      protocols: ['NordLynx', 'OpenVPN', 'IKEv2'],
      encryption: 'AES-256-GCM',
      streaming: ['Netflix', 'Disney+', 'HBO Max', 'Amazon Prime'],
      killswitch: true,
      splitTunneling: true,
      adBlocker: true,
      doubleVPN: true,
      tor: true,
      dedicatedIP: true,
      support24: true,
      moneyBack: '30 days'
    },
    
    pricing: {
      monthly: 11.99,
      yearly: 59.99,
      currency: 'USD'
    }
  },
  
  surfshark: {
    id: 'surfshark',
    name: 'Surfshark',
    logo: 'S',
    color: '#23A8F0',
    website: 'https://surfshark.com',
    
    ratings: {
      speed: 4.0,
      stability: 4.0,
      privacy: 4.3,
      streaming: 4.4,
      value: 4.9,
      support: 4.2
    },
    
    features: {
      servers: '3,200+',
      countries: '100',
      devices: 'Unlimited',
      protocols: ['WireGuard', 'OpenVPN', 'IKEv2'],
      encryption: 'AES-256-GCM',
      streaming: ['Netflix', 'Disney+', 'Amazon Prime', 'Hulu'],
      killswitch: true,
      splitTunneling: true,
      adBlocker: true,
      doubleVPN: true,
      tor: false,
      dedicatedIP: false,
      support24: true,
      moneyBack: '30 days'
    },
    
    pricing: {
      monthly: 15.95,
      yearly: 47.88,
      currency: 'USD'
    }
  },
  
  protonvpn: {
    id: 'protonvpn',
    name: 'ProtonVPN',
    logo: 'P',
    color: '#6D4AFF',
    website: 'https://protonvpn.com',
    
    ratings: {
      speed: 3.5,
      stability: 3.8,
      privacy: 5.0,
      streaming: 3.0,
      value: 4.5,
      support: 3.5
    },
    
    features: {
      servers: '3,000+',
      countries: '70',
      devices: 10,
      protocols: ['WireGuard', 'OpenVPN'],
      encryption: 'AES-256',
      streaming: ['Netflix', 'YouTube'],
      killswitch: true,
      splitTunneling: true,
      adBlocker: false,
      doubleVPN: true,
      tor: true,
      dedicatedIP: false,
      support24: false,
      moneyBack: '30 days'
    },
    
    pricing: {
      monthly: 9.99,
      yearly: 71.88,
      currency: 'USD'
    }
  },
  
  cyberghost: {
    id: 'cyberghost',
    name: 'CyberGhost',
    logo: 'CG',
    color: '#714674',
    website: 'https://cyberghost.com',
    
    ratings: {
      speed: 3.8,
      stability: 3.8,
      privacy: 3.8,
      streaming: 4.6,
      value: 4.3,
      support: 4.0
    },
    
    features: {
      servers: '9,000+',
      countries: '91',
      devices: 7,
      protocols: ['WireGuard', 'OpenVPN', 'IKEv2'],
      encryption: 'AES-256',
      streaming: ['Netflix', 'Disney+', 'Amazon Prime', 'HBO Max'],
      killswitch: true,
      splitTunneling: true,
      adBlocker: false,
      doubleVPN: false,
      tor: false,
      dedicatedIP: true,
      support24: true,
      moneyBack: '45 days'
    },
    
    pricing: {
      monthly: 12.99,
      yearly: 56.94,
      currency: 'USD'
    }
  }
}

const featureLabels = {
  servers: 'Servers',
  countries: 'Countries',
  devices: 'Devices',
  protocols: 'Protocols',
  encryption: 'Encryption',
  streaming: 'Streaming',
  killswitch: 'Kill Switch',
  splitTunneling: 'Split Tunneling',
  adBlocker: 'Ad Blocker',
  doubleVPN: 'Double VPN',
  tor: 'Tor Support',
  dedicatedIP: 'Dedicated IP',
  support24: '24/7 Support',
  moneyBack: 'Money Back'
}

function VPNComparison() {
  const [selectedVPNs, setSelectedVPNs] = useState(['expressvpn', 'nordvpn', 'surfshark'])
  const [viewMode, setViewMode] = useState('radar') // 'radar' or 'table'
  
  const toggleVPN = (vpnId) => {
    if (selectedVPNs.includes(vpnId)) {
      if (selectedVPNs.length > 1) {
        setSelectedVPNs(selectedVPNs.filter(id => id !== vpnId))
      }
    } else {
      if (selectedVPNs.length < 5) {
        setSelectedVPNs([...selectedVPNs, vpnId])
      }
    }
  }
  
  const allVPNs = Object.values(vpnComparisonData)
  
  return (
    <div className="container" style={{ padding: '32px 24px' }}>
      <Link 
        to="/" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          color: 'var(--text-secondary)',
          marginBottom: '24px'
        }}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>
      
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          VPN Comparison
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Compare top VPN services across speed, privacy, streaming, and value
        </p>
      </div>
      
      {/* VPN Selection */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Select VPNs to Compare (max 5)
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {allVPNs.map(vpn => (
            <button
              key={vpn.id}
              onClick={() => toggleVPN(vpn.id)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: selectedVPNs.includes(vpn.id) 
                  ? `2px solid ${vpn.color}` 
                  : '2px solid var(--border-color)',
                backgroundColor: selectedVPNs.includes(vpn.id) 
                  ? `${vpn.color}22` 
                  : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <VPNLogo vpnId={vpn.id} size={24} />
              <span style={{ 
                color: selectedVPNs.includes(vpn.id) 
                  ? vpn.color 
                  : 'var(--text-secondary)',
                fontWeight: selectedVPNs.includes(vpn.id) ? 600 : 400
              }}>
                {vpn.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* View Mode Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setViewMode('radar')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: viewMode === 'radar' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            color: viewMode === 'radar' ? 'white' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Radar Chart
        </button>
        <button
          onClick={() => setViewMode('table')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: viewMode === 'table' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            color: viewMode === 'table' ? 'white' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Detailed Comparison
        </button>
      </div>
      
      {/* Radar Chart View */}
      {viewMode === 'radar' && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
            Performance Overview
          </h3>
          <VPNRadarChart vpnIds={selectedVPNs} height={450} />
          
          {/* Dimension Legend */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-color)'
          }}>
            {vpnDimensions.map(dim => (
              <div key={dim.key} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{dim.fullLabel}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Weight: {dim.weight * 100}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Table View */}
      {viewMode === 'table' && (
        <div className="card" style={{ marginBottom: '24px', overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  minWidth: '150px'
                }}>
                  Feature
                </th>
                {selectedVPNs.map(id => {
                  const vpn = vpnComparisonData[id]
                  return (
                    <th key={id} style={{ 
                      padding: '12px', 
                      textAlign: 'center',
                      color: vpn.color,
                      fontWeight: 600
                    }}>
                      {vpn.name}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {/* Ratings Section */}
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <td colSpan={selectedVPNs.length + 1} style={{ 
                  padding: '12px', 
                  fontWeight: 600, 
                  color: 'var(--text-primary)'
                }}>
                  Ratings (out of 5)
                </td>
              </tr>
              {['speed', 'stability', 'privacy', 'streaming', 'value', 'support'].map(metric => (
                <tr key={metric} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', textTransform: 'capitalize' }}>
                    {metric}
                  </td>
                  {selectedVPNs.map(id => (
                    <td key={id} style={{ 
                      padding: '12px', 
                      textAlign: 'center',
                      fontWeight: 600,
                      color: vpnComparisonData[id].ratings[metric] >= 4 
                        ? '#10b981' 
                        : vpnComparisonData[id].ratings[metric] >= 3 
                          ? '#f59e0b' 
                          : '#ef4444'
                    }}>
                      {vpnComparisonData[id].ratings[metric]}
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Features Section */}
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <td colSpan={selectedVPNs.length + 1} style={{ 
                  padding: '12px', 
                  fontWeight: 600, 
                  color: 'var(--text-primary)'
                }}>
                  Features
                </td>
              </tr>
              {['servers', 'countries', 'devices', 'encryption', 'killswitch', 'splitTunneling', 'adBlocker', 'doubleVPN', 'support24', 'moneyBack'].map(feature => (
                <tr key={feature} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px' }}>
                    {featureLabels[feature]}
                  </td>
                  {selectedVPNs.map(id => {
                    const value = vpnComparisonData[id].features[feature]
                    return (
                      <td key={id} style={{ padding: '12px', textAlign: 'center' }}>
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check size={18} style={{ color: '#10b981' }} />
                          ) : (
                            <X size={18} style={{ color: '#ef4444' }} />
                          )
                        ) : Array.isArray(value) ? (
                          <span style={{ fontSize: '12px' }}>{value.slice(0, 2).join(', ')}</span>
                        ) : (
                          value
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
              
              {/* Pricing Section */}
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <td colSpan={selectedVPNs.length + 1} style={{ 
                  padding: '12px', 
                  fontWeight: 600, 
                  color: 'var(--text-primary)'
                }}>
                  Pricing (USD)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Monthly</td>
                {selectedVPNs.map(id => (
                  <td key={id} style={{ 
                    padding: '12px', 
                    textAlign: 'center',
                    fontWeight: 600
                  }}>
                    ${vpnComparisonData[id].pricing.monthly}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Yearly</td>
                {selectedVPNs.map(id => (
                  <td key={id} style={{ 
                    padding: '12px', 
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#10b981'
                  }}>
                    ${vpnComparisonData[id].pricing.yearly}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Cost per month</td>
                {selectedVPNs.map(id => (
                  <td key={id} style={{ 
                    padding: '12px', 
                    textAlign: 'center',
                    fontWeight: 600
                  }}>
                    ${(vpnComparisonData[id].pricing.yearly / 12).toFixed(2)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      
      {/* CTA */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px' 
      }}>
        {selectedVPNs.map(id => {
          const vpn = vpnComparisonData[id]
          return (
            <a
              key={id}
              href={vpn.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ 
                padding: '16px 24px',
                backgroundColor: vpn.color,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              Get {vpn.name}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default VPNComparison
