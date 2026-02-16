import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'
import { ArrowLeft, Zap, Clock, Server, Activity, Check, X, Globe } from 'lucide-react'
import axios from 'axios'
import ServerStatusCard from '../components/ServerStatusCard'

const vpnInfo = {
  expressvpn: { name: 'ExpressVPN', color: '#c5283d' },
  nordvpn: { name: 'NordVPN', color: '#4687d8' },
  surfshark: { name: 'Surfshark', color: '#2ee0ca' },
  protonvpn: { name: 'ProtonVPN', color: '#6d4aff' },
  cyberghost: { name: 'CyberGhost', color: '#714674' }
}

function VPNDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/vpn/${id}`)
        setData(response.data)
      } catch (error) {
        console.error('Failed to fetch VPN data:', error)
        setData(getMockDetail(id))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const getStatusBadge = (status) => {
    const styles = {
      online: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      degraded: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
      offline: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
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
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <Activity className="animate-spin" style={{ color: 'var(--accent-primary)' }} size={32} />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container" style={{ padding: '32px', textAlign: 'center' }}>
        <p>VPN not found</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const info = vpnInfo[id] || { name: data.name, color: '#6b7280' }

  return (
    <div className="container" style={{ padding: '32px 24px' }}>
      {/* Back Button */}
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

      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        marginBottom: '32px' 
      }}>
        <div 
          className="vpn-logo"
          style={{ 
            backgroundColor: info.color,
            width: '56px',
            height: '56px',
            fontSize: '20px'
          }}
        >
          {info.name.charAt(0)}
        </div>
        <div>
          <h1 className="page-title" style={{ marginBottom: '4px' }}>{info.name}</h1>
          {getStatusBadge(data.currentStats.status)}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-label">
            <Server size={14} style={{ marginRight: '6px' }} />
            Uptime
          </div>
          <div className="stat-value" style={{ color: data.currentStats.uptime > 95 ? '#10b981' : '#f59e0b' }}>
            {data.currentStats.uptime}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <Zap size={14} style={{ marginRight: '6px' }} />
            Avg Speed
          </div>
          <div className="stat-value">
            {data.currentStats.speed} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>Mbps</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <Clock size={14} style={{ marginRight: '6px' }} />
            Avg Latency
          </div>
          <div className="stat-value">
            {data.currentStats.latency} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>ms</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <Activity size={14} style={{ marginRight: '6px' }} />
            Nodes Online
          </div>
          <div className="stat-value">
            {data.nodes.online} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ {data.nodes.total}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-2" style={{ marginBottom: '32px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
            Download Speed (24h)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.history24h}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} unit=" Mbps" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="speed" 
                stroke={info.color} 
                strokeWidth={2}
                dot={false}
                name="Speed (Mbps)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
            Latency (24h)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.history24h}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} unit=" ms" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="latency" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={false}
                name="Latency (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Server Locations */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          <Server size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Server Locations
        </h3>
        <ServerStatusCard vpnId={id} />
      </div>

      {/* Additional Info */}
      <div className="grid grid-2">
        {/* Streaming Support */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
            <Globe size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Streaming Support
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(data.streaming).map(([service, supported]) => (
              <div key={service} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '12px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '8px'
              }}>
                <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                  {service === 'netflix' ? 'Netflix' : 
                   service === 'youtube' ? 'YouTube' : 
                   service === 'disney' ? 'Disney+' : 
                   service === 'hulu' ? 'Hulu' : 'BBC iPlayer'}
                </span>
                {supported ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
                    <Check size={16} /> Supported
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444' }}>
                    <X size={16} /> Not Supported
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
            Technical Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                Supported Protocols
              </span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {data.protocols.map(protocol => (
                  <span key={protocol} style={{
                    padding: '4px 10px',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {protocol}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                Pricing
              </span>
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                <p>Monthly: <strong>${data.pricing.monthly}</strong></p>
                <p>Yearly: <strong>${data.pricing.yearly}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <Link to={`/reviews/${id}`} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
          Read Full Review
        </Link>
      </div>
    </div>
  )
}

// Mock data for when API is not available
function getMockDetail(id) {
  const info = vpnInfo[id] || { name: 'VPN', color: '#6b7280' }
  
  // Generate 24 hours of mock data
  const history24h = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    history24h.push({
      time: hour.getHours() + ':00',
      speed: Math.floor(Math.random() * 40) + 60,
      latency: Math.floor(Math.random() * 30) + 20,
      uptime: Math.floor(Math.random() * 10) + 90
    })
  }

  return {
    id,
    name: info.name,
    currentStats: {
      uptime: 94.5,
      speed: 78,
      latency: 35,
      status: 'online'
    },
    history24h,
    nodes: {
      total: 28,
      online: 25,
      locations: ['United States', 'United Kingdom', 'Germany', 'Japan', 'Australia']
    },
    streaming: {
      netflix: true,
      youtube: true,
      disney: true,
      hulu: false,
      bbc: true
    },
    protocols: ['OpenVPN', 'WireGuard', 'IKEv2'],
    pricing: {
      monthly: 12.95,
      yearly: 99.95,
      currency: 'USD'
    }
  }
}

export default VPNDetail
