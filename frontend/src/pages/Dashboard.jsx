import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw, Zap, Clock, Server, BarChart3, Wifi, WifiOff, Film, Shield, Gamepad2 } from 'lucide-react'
import axios from 'axios'
import { vpnLogos, VPNLogo } from '../data/vpnLogos'
import SecurityStackWidget from '../components/SecurityStackWidget'

// Use case categories based on research
const useCases = {
  streaming: { icon: Film, label: 'Streaming', color: '#8b5cf6' },
  privacy: { icon: Shield, label: 'Privacy', color: '#10b981' },
  gaming: { icon: Gamepad2, label: 'Gaming', color: '#f59e0b' }
}

// VPN use case mapping (which VPNs are best for which use case)
const vpnUseCases = {
  expressvpn: { streaming: true, privacy: true, gaming: true },
  nordvpn: { streaming: true, privacy: true, gaming: true },
  surfshark: { streaming: true, privacy: false, gaming: true },
  protonvpn: { streaming: false, privacy: true, gaming: false },
  cyberghost: { streaming: true, privacy: false, gaming: false }
}

function Dashboard() {
  const [vpnData, setVpnData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [activeFilter, setActiveFilter] = useState(null)

  const fetchData = async () => {
    try {
      setRefreshing(true)
      const response = await axios.get('/api/vpn/status')
      setVpnData(response.data)
      if (response.data.length > 0) {
        setLastUpdated(new Date(response.data[0].lastChecked))
      }
    } catch (error) {
      console.error('Failed to fetch VPN data:', error)
      setVpnData(getMockData())
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  // Calculate stats
  const totalVPNs = vpnData.length
  const onlineVPNs = vpnData.filter(v => v.status === 'online').length
  const avgSpeed = vpnData.length > 0 
    ? Math.round(vpnData.reduce((sum, v) => sum + v.speed, 0) / vpnData.length)
    : 0
  const avgLatency = vpnData.length > 0 
    ? Math.round(vpnData.reduce((sum, v) => v.latency > 0 ? sum + v.latency : sum, 0) / vpnData.filter(v => v.latency > 0).length) || 0
    : 0
  const onlineRate = totalVPNs > 0 ? Math.round((onlineVPNs / totalVPNs) * 100) : 0

  // Filter VPNs by use case
  const filteredVPNs = activeFilter 
    ? vpnData.filter(vpn => vpnUseCases[vpn.id]?.[activeFilter])
    : vpnData

  const getStatusBadge = (status) => {
    const styles = {
      online: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', icon: Wifi },
      degraded: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', icon: Wifi },
      offline: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', icon: WifiOff }
    }
    const s = styles[status] || styles.offline
    const Icon = s.icon
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: s.bg,
        color: s.color,
        textTransform: 'capitalize'
      }}>
        <Icon size={12} />
        {status}
      </span>
    )
  }

  const getLatencyColor = (latency) => {
    if (latency < 50) return '#10b981'
    if (latency < 100) return '#f59e0b'
    return '#ef4444'
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <RefreshCw className="animate-spin" style={{ color: 'var(--accent-primary)' }} size={32} />
      </div>
    )
  }

  return (
    <div className="container dashboard-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">VPN Performance Dashboard</h1>
        <p className="page-subtitle">Real-time monitoring of top VPN services</p>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">
            <Server size={14} style={{ marginRight: '6px' }} />
            Monitored VPNs
          </div>
          <div className="stat-value">{totalVPNs}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <Wifi size={14} style={{ marginRight: '6px' }} />
            Online Rate
          </div>
          <div className="stat-value">{onlineRate}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <Zap size={14} style={{ marginRight: '6px' }} />
            Avg Speed
          </div>
          <div className="stat-value">{avgSpeed} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Mbps</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <Clock size={14} style={{ marginRight: '6px' }} />
            Avg Latency
          </div>
          <div className="stat-value">{avgLatency} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>ms</span></div>
        </div>
      </div>

      {/* Security Stack Widget */}
      <SecurityStackWidget />

      {/* Last Updated & Refresh */}
      <div className="refresh-bar">
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Loading...'}
        </p>
        <button 
          className="btn btn-secondary refresh-btn"
          onClick={fetchData}
          disabled={refreshing}
        >
          <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
          <span className="refresh-text">Refresh</span>
        </button>
      </div>

      {/* Use Case Filter */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveFilter(null)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            backgroundColor: activeFilter === null ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            color: activeFilter === null ? 'white' : 'var(--text-secondary)',
            transition: 'all 0.2s'
          }}
        >
          All VPNs
        </button>
        {Object.entries(useCases).map(([key, { icon: Icon, label, color }]) => (
          <button
            key={key}
            onClick={() => setActiveFilter(activeFilter === key ? null : key)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              backgroundColor: activeFilter === key ? color : 'var(--bg-tertiary)',
              color: activeFilter === key ? 'white' : 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* VPN Cards - Mobile First Card Layout */}
      <div className="vpn-grid">
        {filteredVPNs.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            <p>No VPNs match this filter</p>
          </div>
        ) : filteredVPNs.map((vpn) => {
          const logo = vpnLogos[vpn.id] || { name: vpn.name, color: '#6b7280', text: vpn.name?.charAt(0) }
          return (
            <div key={vpn.id} className="vpn-card">
              {/* VPN Header */}
              <div className="vpn-card-header">
                <VPNLogo vpnId={vpn.id} size={44} />
                <div className="vpn-info">
                  <h3 className="vpn-name">{vpn.name}</h3>
                  {getStatusBadge(vpn.status)}
                </div>
              </div>

              {/* Stats Row */}
              <div className="vpn-stats">
                <div className="vpn-stat">
                  <Zap size={14} style={{ color: '#f59e0b' }} />
                  <span className="vpn-stat-value">{vpn.speed}</span>
                  <span className="vpn-stat-label">Mbps</span>
                </div>
                <div className="vpn-stat">
                  <Clock size={14} style={{ color: getLatencyColor(vpn.latency) }} />
                  <span className="vpn-stat-value" style={{ color: getLatencyColor(vpn.latency) }}>{vpn.latency}</span>
                  <span className="vpn-stat-label">ms</span>
                </div>
                <div className="vpn-stat">
                  <Server size={14} style={{ color: '#06b6d4' }} />
                  <span className="vpn-stat-value">{vpn.nodes?.online || 0}</span>
                  <span className="vpn-stat-label">/ {vpn.nodes?.total || 0}</span>
                </div>
              </div>

              {/* Uptime Bar */}
              <div className="vpn-uptime">
                <span className="vpn-uptime-label">Uptime</span>
                <div className="vpn-uptime-bar">
                  <div 
                    className="vpn-uptime-fill"
                    style={{ 
                      width: `${vpn.uptime}%`,
                      backgroundColor: vpn.uptime > 95 ? '#10b981' : vpn.uptime > 80 ? '#f59e0b' : '#ef4444'
                    }} 
                  />
                </div>
                <span className="vpn-uptime-value">{vpn.uptime}%</span>
              </div>

              {/* Streaming Support */}
              <div className="vpn-streaming">
                <span className="streaming-label">Streaming</span>
                <div className="streaming-icons">
                  <span className={`streaming-badge ${vpn.streaming?.netflix ? 'supported' : 'unsupported'}`}>N</span>
                  <span className={`streaming-badge ${vpn.streaming?.youtube ? 'supported' : 'unsupported'}`}>Y</span>
                  <span className={`streaming-badge ${vpn.streaming?.disney ? 'supported' : 'unsupported'}`}>D</span>
                </div>
              </div>

              {/* Actions */}
              <div className="vpn-actions">
                <Link to={`/reviews/${vpn.id}`} className="btn btn-primary btn-sm">
                  Review
                </Link>
                <Link to={`/vpn/${vpn.id}`} className="btn btn-secondary btn-sm">
                  <BarChart3 size={14} />
                  <span className="btn-text">Data</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Mock data for when API is not available
function getMockData() {
  return [
    { id: 'expressvpn', name: 'ExpressVPN', status: 'online', uptime: 98.5, speed: 95, latency: 18, nodes: { online: 50, total: 52 }, streaming: { netflix: true, youtube: true, disney: true }, lastChecked: new Date().toISOString() },
    { id: 'nordvpn', name: 'NordVPN', status: 'online', uptime: 96.2, speed: 88, latency: 25, nodes: { online: 180, total: 185 }, streaming: { netflix: true, youtube: true, disney: true }, lastChecked: new Date().toISOString() },
    { id: 'surfshark', name: 'Surfshark', status: 'online', uptime: 94.5, speed: 85, latency: 35, nodes: { online: 25, total: 28 }, streaming: { netflix: true, youtube: true, disney: true }, lastChecked: new Date().toISOString() },
    { id: 'protonvpn', name: 'ProtonVPN', status: 'online', uptime: 94.8, speed: 65, latency: 55, nodes: { online: 45, total: 50 }, streaming: { netflix: true, youtube: true, disney: false }, lastChecked: new Date().toISOString() },
    { id: 'cyberghost', name: 'CyberGhost', status: 'online', uptime: 89.5, speed: 72, latency: 38, nodes: { online: 120, total: 125 }, streaming: { netflix: true, youtube: true, disney: true }, lastChecked: new Date().toISOString() }
  ]
}

export default Dashboard
