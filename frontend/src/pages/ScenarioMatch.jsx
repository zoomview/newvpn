import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Film, Gamepad2, Shield, Briefcase, Globe, Star, Zap, Lock, Wifi, Monitor, Users } from 'lucide-react'
import { vpnRadarData } from '../components/VPNRadarChart'
import { VPNLogo } from '../data/vpnLogos'

// Use case scenarios with weights
const useCaseScenarios = {
  streaming: {
    id: 'streaming',
    name: 'Streaming & Entertainment',
    icon: Film,
    color: '#8b5cf6',
    description: 'Unlock geo-restricted content on Netflix, Disney+, HBO, and more',
    priority: 'streaming',
    weights: {
      speed: 0.25,
      streaming: 0.40,
      stability: 0.15,
      privacy: 0.10,
      value: 0.10
    },
    recommended: ['expressvpn', 'nordvpn', 'cyberghost', 'surfshark']
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    color: '#f59e0b',
    description: 'Low latency, fast speeds for competitive gaming',
    priority: 'speed',
    weights: {
      speed: 0.40,
      stability: 0.30,
      value: 0.15,
      privacy: 0.10,
      streaming: 0.05
    },
    recommended: ['expressvpn', 'nordvpn', 'surfshark']
  },
  privacy: {
    id: 'privacy',
    name: 'Privacy & Security',
    icon: Shield,
    color: '#10b981',
    description: 'Maximum anonymity, no logs, strong encryption',
    priority: 'privacy',
    weights: {
      privacy: 0.40,
      stability: 0.20,
      value: 0.20,
      speed: 0.10,
      streaming: 0.10
    },
    recommended: ['expressvpn', 'nordvpn', 'protonvpn']
  },
  remote: {
    id: 'remote',
    name: 'Remote Work',
    icon: Briefcase,
    color: '#3b82f6',
    description: 'Secure connection for working from home or public WiFi',
    priority: 'stability',
    weights: {
      stability: 0.30,
      privacy: 0.25,
      speed: 0.20,
      value: 0.15,
      streaming: 0.10
    },
    recommended: ['nordvpn', 'expressvpn', 'surfshark']
  },
  travel: {
    id: 'travel',
    name: 'Travel',
    icon: Globe,
    color: '#06b6d4',
    description: 'Access home content while traveling abroad',
    priority: 'streaming',
    weights: {
      streaming: 0.30,
      speed: 0.25,
      privacy: 0.20,
      stability: 0.15,
      value: 0.10
    },
    recommended: ['expressvpn', 'surfshark', 'nordvpn']
  },
  family: {
    id: 'family',
    name: 'Family Use',
    icon: Users,
    color: '#ec4899',
    description: 'Protect all family devices with unlimited connections',
    priority: 'value',
    weights: {
      value: 0.35,
      devices: 0.25,
      privacy: 0.15,
      speed: 0.15,
      streaming: 0.10
    },
    recommended: ['surfshark', 'nordvpn', 'cyberghost']
  }
}

// Calculate scores for each VPN based on scenario weights
function calculateScores(scenario) {
  const scores = {}
  
  Object.entries(vpnRadarData).forEach(([vpnId, vpnData]) => {
    let score = 0
    score += vpnData.speed * scenario.weights.speed
    score += vpnData.stability * scenario.weights.stability
    score += vpnData.privacy * scenario.weights.privacy
    score += vpnData.streaming * scenario.weights.streaming
    score += vpnData.value * scenario.weights.value
    
    // Bonus for unlimited devices (for family use)
    if (scenario.id === 'family' && vpnId === 'surfshark') {
      score += 10 // Surfshark unlimited devices
    }
    
    scores[vpnId] = Math.round(score)
  })
  
  // Sort by score
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([vpnId, score]) => ({ vpnId, score }))
}

function ScenarioMatch() {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [showResults, setShowResults] = useState(false)
  
  const handleScenarioSelect = (scenarioId) => {
    setSelectedScenario(useCaseScenarios[scenarioId])
    setShowResults(true)
  }
  
  const resetSelection = () => {
    setSelectedScenario(null)
    setShowResults(false)
  }
  
  const rankedVPNs = selectedScenario ? calculateScores(selectedScenario) : []
  
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
          Find Your Perfect VPN
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Select your primary use case and we'll recommend the best VPN for you
        </p>
      </div>
      
      {/* Scenario Selection */}
      {!showResults ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {Object.values(useCaseScenarios).map((scenario) => {
            const Icon = scenario.icon
            return (
              <button
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario.id)}
                className="card"
                style={{
                  padding: '24px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = scenario.color
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: `${scenario.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} style={{ color: scenario.color }} />
                  </div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 600,
                    margin: 0
                  }}>
                    {scenario.name}
                  </h3>
                </div>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '14px',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {scenario.description}
                </p>
              </button>
            )
          })}
        </div>
      ) : (
        /* Results */
        <div>
          <button
            onClick={resetSelection}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              fontSize: '14px'
            }}
          >
            <ArrowLeft size={16} />
            Choose different scenario
          </button>
          
          {/* Selected Scenario */}
          <div className="card" style={{ 
            marginBottom: '24px',
            background: `linear-gradient(135deg, ${selectedScenario.color}11 0%, var(--bg-secondary) 100%)`,
            borderColor: selectedScenario.color
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              {(() => {
                const Icon = selectedScenario.icon
                return (
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    backgroundColor: selectedScenario.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={28} style={{ color: 'white' }} />
                  </div>
                )
              })()}
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  {selectedScenario.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                  {selectedScenario.description}
                </p>
              </div>
            </div>
            
            {/* Weight visualization */}
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {Object.entries(selectedScenario.weights)
                .filter(([_, weight]) => weight > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([key, weight]) => (
                  <div 
                    key={key}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {Math.round(weight * 100)}%
                  </div>
                ))}
            </div>
          </div>
          
          {/* Ranked VPNs */}
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
            Recommended VPNs for {selectedScenario.name}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rankedVPNs.map((item, index) => {
              const vpn = vpnRadarData[item.vpnId]
              const isTop3 = index < 3
              return (
                <div 
                  key={item.vpnId} 
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    borderColor: isTop3 ? vpnColors[item.vpnId] : undefined,
                    borderWidth: isTop3 ? '2px' : '1px'
                  }}
                >
                  {/* Rank */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: index === 0 
                      ? '#f59e0b' 
                      : index === 1 
                        ? '#9ca3af' 
                        : index === 2 
                          ? '#cd7f32' 
                          : 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: index < 3 ? '16px' : '14px',
                    color: index < 3 ? 'white' : 'var(--text-secondary)'
                  }}>
                    {index + 1}
                  </div>
                  
                  {/* Logo & Name */}
                  <VPNLogo vpnId={item.vpnId} size={40} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      margin: 0 
                    }}>
                      {vpn.name}
                    </h4>
                    <p style={{ 
                      color: 'var(--text-muted)', 
                      fontSize: '12px',
                      margin: '4px 0 0'
                    }}>
                      Match Score: {item.score}/100
                    </p>
                  </div>
                  
                  {/* Score Bar */}
                  <div style={{ 
                    width: '120px',
                    height: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${item.score}%`,
                      height: '100%',
                      backgroundColor: item.score >= 85 
                        ? '#10b981' 
                        : item.score >= 75 
                          ? '#f59e0b' 
                          : '#ef4444',
                      borderRadius: '4px'
                    }} />
                  </div>
                  
                  {/* CTA */}
                  <Link 
                    to={`/reviews/${item.vpnId}`}
                    className="btn btn-primary btn-sm"
                    style={{
                      backgroundColor: vpnColors[item.vpnId]
                    }}
                  >
                    View Review
                  </Link>
                </div>
              )
            })}
          </div>
          
          {/* Comparison Link */}
          <div style={{ 
            marginTop: '24px', 
            textAlign: 'center' 
          }}>
            <Link 
              to="/comparison" 
              className="btn btn-secondary"
            >
              Compare All VPNs
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// Color mapping for VPNs
const vpnColors = {
  expressvpn: '#E51E28',
  nordvpn: '#4687D8',
  surfshark: '#23A8F0',
  protonvpn: '#6D4AFF',
  cyberghost: '#714674'
}

export default ScenarioMatch
