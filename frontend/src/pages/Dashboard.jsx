import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw, Zap, Clock, Server, Check, X, ChevronRight, BarChart3 } from 'lucide-react'
import axios from 'axios'

// VPN colors for logos
const vpnColors = {
  expressvpn: '#c5283d',
  nordvpn: '#4687d8',
  surfshark: '#2ee0ca',
  protonvpn: '#6d4aff',
  cyberghost: '#714674'
}

function Dashboard() {
  const [vpnData, setVpnData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

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
      // Use mock data if API is not available
      setVpnData(getMockData())
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  // Calculate stats
  const totalVPNs = vpnData.length
  const onlineVPNs = vpnData.filter(v => v.status === 'online').length
  const avgSpeed = vpnData.length > 0 
    ? Math.round(vpnData.reduce((sum, v) => sum + v.speed, 0) / vpnData.length)
    : 0
  const avgLatency = vpnData.length > 0 
    ? Math.round(vpnData.reduce((sum, v) => sum + v.latency, 0) / vpnData.length)
    : 0
  const onlineRate = totalVPNs > 0 ? Math.round((onlineVPNs / totalVPNs) * 100) : 0

  const getStatusBadge = (status) => {
    const styles = {
      online: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', dot: '#10b981' },
      degraded: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', dot: '#f59e0b' },
      offline: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', dot: '#ef4444' }
    }
    const s = styles[status] || styles.offline
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        backgroundColor: s.bg,
        color: s.color,
        textTransform: 'capitalize'
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: s.dot
        }} />
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
    <div className="container" style={{ padding: '32px 24px' }}>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">VPN Performance Dashboard</h1>
        <p className="page-subtitle">Real-time monitoring of top VPN services</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-label">
            <Server size={14} style={{ marginRight: '6px' }} />
            Monitored VPNs
          </div>
          <div className="stat-value">{totalVPNs}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <Zap size={14} style={{ marginRight: '6px' }} />
            Online Rate
          </div>
          <div className="stat-value">{onlineRate}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <BarChart3 size={14} style={{ marginRight: '6px' }} />
            Avg Speed
          </div>
          <div className="stat-value">{avgSpeed} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>Mbps</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <Clock size={14} style={{ marginRight: '6px' }} />
            Avg Latency
          </div>
          <div className="stat-value">{avgLatency} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>ms</span></div>
        </div>
      </div>

      {/* Last Updated & Refresh */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px' 
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Loading...'}
        </p>
        <button 
          className="btn btn-secondary"
          onClick={fetchData}
          disabled={refreshing}
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* VPN Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: '16px 20px' }}>Provider</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px' }}>Uptime</th>
              <th style={{ padding: '16px 20px' }}>Speed</th>
              <th style={{ padding: '16px 20px' }}>Latency</th>
              <th style={{ padding: '16px 20px' }}>Nodes</th>
              <th style={{ padding: '16px 20px' }}>Streaming</th>
              <th style={{ padding: '16px 20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vpnData.map((vpn) => (
              <tr key={vpn.id}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      className="vpn-logo"
                      style={{ backgroundColor: vpnColors[vpn.id] || '#6b7280' }}
                    >
                      {vpn.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: '600' }}>{vpn.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  {getStatusBadge(vpn.status)}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: '600', minWidth: '40px' }}>{vpn.uptime}%</span>
                    <div className="progress-bar" style={{ width: '80px' }}>
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${vpn.uptime}%`,
                          backgroundColor: vpn.uptime > 95 ? '#10b981' : vpn.uptime > 80 ? '#f59e0b' : '#ef4444'
                        }} 
                      />
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={14} style={{ color: '#f59e0b' }} />
                    <span style={{ fontWeight: '600' }}>{vpn.speed}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Mbps</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    fontWeight: '600',
                    color: getLatencyColor(vpn.latency)
                  }}>
                    {vpn.latency} ms
                  </span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ fontWeight: '600' }}>{vpn.nodes.online}</span>
                  <span style={{ color: 'var(--text-muted)' }}> / {vpn.nodes.total}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div className="streaming-icons">
                    <span 
                      className={`streaming-icon ${vpn.streaming.netflix ? 'streaming-supported' : 'streaming-unsupported'}`}
                      title="Netflix"
                    >
                      N
                    </span>
                    <span 
                      className={`streaming-icon ${vpn.streaming.youtube ? 'streaming-supported' : 'streaming-unsupported'}`}
                      title="YouTube"
                    >
                      Y
                    </span>
                    <span 
                      className={`streaming-icon ${vpn.streaming.disney ? 'streaming-supported' : 'streaming-unsupported'}`}
                      title="Disney+"
                    >
                      D
                    </span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link 
                      to={`/reviews/${vpn.id}`}
                      className="btn btn-primary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Review
                    </Link>
                    <Link 
                      to={`/vpn/${vpn.id}`}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      <BarChart3 size={14} />
                      Data
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Mock data for when API is not available
function getMockData() {
  return [
    {
      id: 'expressvpn',
      name: 'ExpressVPN',
      status: 'online',
      uptime: 98.5,
      speed: 95,
      latency: 18,
      nodes: { online: 50, total: 52 },
      streaming: { netflix: true, youtube: true, disney: true },
      lastChecked: new Date().toISOString()
    },
    {
      id: 'nordvpn',
      name: 'NordVPN',
      status: 'online',
      uptime: 96.2,
      speed: 88,
      latency: 25,
      nodes: { online: 180, total: 185 },
      streaming: { netflix: true, youtube: true, disney: true },
      lastChecked: new Date().toISOString()
    },
    {
      id: 'surfshark',
      name: 'Surfshark',
      status: 'online',
      uptime: 94.5,
      speed: 85,
      latency: 35,
      nodes: { online: 25, total: 28 },
      streaming: { netflix: true, youtube: true, disney: true },
      lastChecked: new Date().toISOString()
    },
    {
      id: 'protonvpn',
      name: 'ProtonVPN',
      status: 'online',
      uptime: 94.8,
      speed: 65,
      latency: 55,
      nodes: { online: 45, total: 50 },
      streaming: { netflix: true, youtube: true, disney: false },
      lastChecked: new Date().toISOString()
    },
    {
      id: 'cyberghost',
      name: 'CyberGhost',
      status: 'online',
      uptime: 89.5,
      speed: 72,
      latency: 38,
      nodes: { online: 120, total: 125 },
      streaming: { netflix: true, youtube: true, disney: true },
      lastChecked: new Date().toISOString()
    }
  ]
}

export default Dashboard
