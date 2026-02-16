import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Determine if running in production
const isProduction = process.env.NODE_ENV === 'production'
const APP_ROOT = isProduction ? '/var/www/vpnspan/backend' : __dirname

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Data paths
const DATA_DIR = join(APP_ROOT, 'data')
const HISTORY_DIR = join(DATA_DIR, 'history')

// Valid VPN IDs for input validation
const VALID_VPN_IDS = ['expressvpn', 'nordvpn', 'surfshark', 'protonvpn', 'cyberghost']

// Ensure data directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}
if (!fs.existsSync(HISTORY_DIR)) {
  fs.mkdirSync(HISTORY_DIR, { recursive: true })
}

// Default VPN data - Mock for all except Surfshark (real data from monitor)
const defaultVPNData = [
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

// Helper function to get VPN data
function getVPNStatus() {
  const statusFile = join(DATA_DIR, 'vpn-status.json')
  
  try {
    if (fs.existsSync(statusFile)) {
      const data = fs.readFileSync(statusFile, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading VPN status:', error)
  }
  
  return defaultVPNData
}

// Helper function to get VPN detail with history
function getVPNDetail(vpnId) {
  const historyFile = join(HISTORY_DIR, `${vpnId}.json`)
  
  let history = []
  try {
    if (fs.existsSync(historyFile)) {
      const data = fs.readFileSync(historyFile, 'utf-8')
      history = JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading VPN history:', error)
  }
  
  // Generate mock history if none exists
  if (history.length === 0) {
    for (let i = 23; i >= 0; i--) {
      const hour = new Date()
      hour.setHours(hour.getHours() - i)
      history.push({
        time: hour.getHours() + ':00',
        speed: Math.floor(Math.random() * 40) + 60,
        latency: Math.floor(Math.random() * 30) + 20,
        uptime: Math.floor(Math.random() * 10) + 90
      })
    }
  }
  
  // Get current status
  const allStatus = getVPNStatus()
  const current = allStatus.find(v => v.id === vpnId) || defaultVPNData.find(v => v.id === vpnId)
  
  return {
    id: vpnId,
    name: current.name,
    currentStats: {
      uptime: current.uptime,
      speed: current.speed,
      latency: current.latency,
      status: current.status
    },
    history24h: history.slice(-24),
    nodes: current.nodes,
    streaming: current.streaming,
    protocols: ['OpenVPN', 'WireGuard', 'IKEv2'],
    pricing: {
      monthly: 12.95,
      yearly: 99.95,
      currency: 'USD'
    }
  }
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Get all VPN status
app.get('/api/vpn/status', (req, res) => {
  try {
    const vpnData = getVPNStatus()
    res.json(vpnData)
  } catch (error) {
    console.error('Error fetching VPN status:', error)
    res.status(500).json({ error: 'Failed to fetch VPN status' })
  }
})

// Get streaming test results - must be BEFORE /:id route
app.get('/api/vpn/streaming', (req, res) => {
  try {
    const streamingFile = join(DATA_DIR, 'streaming-status.json')
    
    if (fs.existsSync(streamingFile)) {
      const data = JSON.parse(fs.readFileSync(streamingFile, 'utf-8'))
      res.json(data)
    } else {
      res.json({ error: 'No streaming data available yet' })
    }
  } catch (error) {
    console.error('Error fetching streaming data:', error)
    res.status(500).json({ error: 'Failed to fetch streaming data' })
  }
})

// Get jitter test data for a VPN
app.get('/api/vpn/jitter/:id', (req, res) => {
  try {
    const { id } = req.params
    
    // Validate VPN ID to prevent path traversal
    if (!VALID_VPN_IDS.includes(id)) {
      return res.status(400).json({ error: 'Invalid VPN ID' })
    }
    
    let days = parseInt(req.query.days) || 7
    days = Math.min(Math.max(days, 1), 30) // Bound between 1-30 days
    
    const historyFile = join(DATA_DIR, 'jitter', `jitter-${new Date().toISOString().split('T')[0]}.json`)
    
    let jitterData = []
    if (fs.existsSync(historyFile)) {
      const data = JSON.parse(fs.readFileSync(historyFile, 'utf-8'))
      jitterData = data.filter(d => d.vpnId === id)
    }
    
    res.json({
      vpnId: id,
      data: jitterData,
      count: jitterData.length
    })
  } catch (error) {
    console.error('Error fetching jitter data:', error)
    res.status(500).json({ error: 'Failed to fetch jitter data' })
  }
})

// Get single VPN detail - must be AFTER more specific routes
app.get('/api/vpn/:id', (req, res) => {
  try {
    const { id } = req.params
    const vpnDetail = getVPNDetail(id)
    res.json(vpnDetail)
  } catch (error) {
    console.error('Error fetching VPN detail:', error)
    res.status(500).json({ error: 'Failed to fetch VPN detail' })
  }
})

// Get VPN pricing and value data
app.get('/api/vpn/value/:id', (req, res) => {
  try {
    const { id } = req.params
    
    // Validate VPN ID
    if (!VALID_VPN_IDS.includes(id)) {
      return res.status(400).json({ error: 'Invalid VPN ID' })
    }
    
    // VPN value data
    const valueData = {
      expressvpn: {
        id: 'expressvpn',
        name: 'ExpressVPN',
        lastSync: new Date().toISOString(),
        pricing: { monthly: 12.95, yearly: 99.95, currency: 'USD' },
        deals: { active: true, title: '35% off', expires: '2026-03-31' },
        features: { servers: '3,000+', countries: '94', devices: 8, moneyBack: '30 days' }
      },
      nordvpn: {
        id: 'nordvpn',
        name: 'NordVPN',
        lastSync: new Date().toISOString(),
        pricing: { monthly: 11.99, yearly: 59.99, currency: 'USD' },
        deals: { active: true, title: '68% off + 3 months', expires: '2026-03-15' },
        features: { servers: '5,500+', countries: '60', devices: 6, moneyBack: '30 days' }
      },
      surfshark: {
        id: 'surfshark',
        name: 'Surfshark',
        lastSync: new Date().toISOString(),
        pricing: { monthly: 15.95, yearly: 47.88, currency: 'USD' },
        deals: { active: true, title: '82% off', expires: '2026-03-31' },
        features: { servers: '3,200+', countries: '100', devices: 'Unlimited', moneyBack: '30 days' }
      },
      protonvpn: {
        id: 'protonvpn',
        name: 'ProtonVPN',
        lastSync: new Date().toISOString(),
        pricing: { free: true, monthly: 9.99, yearly: 71.88, currency: 'USD' },
        deals: { active: true, title: '50% off', expires: '2026-02-28' },
        features: { servers: '3,000+', countries: '70', devices: 10, moneyBack: '30 days' }
      },
      cyberghost: {
        id: 'cyberghost',
        name: 'CyberGhost',
        lastSync: new Date().toISOString(),
        pricing: { monthly: 12.99, yearly: 56.94, currency: 'USD' },
        deals: { active: true, title: '82% off + Free', expires: '2026-03-31' },
        features: { servers: '9,000+', countries: '91', devices: 7, moneyBack: '45 days' }
      }
    }
    
    const data = valueData[id]
    if (!data) {
      return res.status(404).json({ error: 'VPN not found' })
    }
    
    res.json(data)
  } catch (error) {
    console.error('Error fetching VPN value data:', error)
    res.status(500).json({ error: 'Failed to fetch VPN value data' })
  }
})

// Get stability metrics (computed from jitter data)
app.get('/api/vpn/stability/:id', (req, res) => {
  try {
    const { id } = req.params
    
    // Validate VPN ID
    if (!VALID_VPN_IDS.includes(id)) {
      return res.status(400).json({ error: 'Invalid VPN ID' })
    }
    
    // Read all jitter data for the last 7 days
    const historyFile = join(DATA_DIR, 'jitter', `jitter-${new Date().toISOString().split('T')[0]}.json`)
    
    let jitterData = []
    if (fs.existsSync(historyFile)) {
      const data = JSON.parse(fs.readFileSync(historyFile, 'utf-8'))
      jitterData = data.filter(d => d.vpnId === id)
    }
    
    if (jitterData.length === 0) {
      return res.json({
        vpnId: id,
        status: 'no-data',
        message: 'No jitter data available yet. Tests run daily at 3 AM.'
      })
    }
    
    // Calculate stability metrics
    const latest = jitterData[jitterData.length - 1]
    
    // Stability score based on jitter and success rate
    let stabilityScore = 100
    
    // Deduct for high jitter (stdDev > 10ms = 1 point per ms)
    if (latest.stdDev > 10) {
      stabilityScore -= (latest.stdDev - 10) * 2
    }
    
    // Deduct for low success rate
    if (latest.successRate < 99) {
      stabilityScore -= (99 - latest.successRate) * 5
    }
    
    stabilityScore = Math.max(0, Math.min(100, Math.round(stabilityScore)))
    
    const stabilityLevel = stabilityScore >= 80 ? 'excellent' 
      : stabilityScore >= 60 ? 'good' 
      : stabilityScore >= 40 ? 'fair' 
      : 'poor'
    
    res.json({
      vpnId: id,
      timestamp: latest.timestamp,
      stabilityScore,
      stabilityLevel,
      metrics: {
        avgLatency: latest.avg,
        jitter: latest.stdDev,
        p99Latency: latest.p99,
        successRate: latest.successRate
      },
      recommendation: getStabilityRecommendation(stabilityLevel)
    })
  } catch (error) {
    console.error('Error calculating stability:', error)
    res.status(500).json({ error: 'Failed to calculate stability' })
  }
})

// Helper function for stability recommendations
function getStabilityRecommendation(level) {
  const recommendations = {
    excellent: 'Excellent connection stability. Ideal for gaming and video calls.',
    good: 'Good connection stability. Suitable for most activities.',
    fair: 'Fair stability. Consider switching to a closer server.',
    poor: 'Poor stability. Try a different server or VPN protocol.'
  }
  return recommendations[level] || recommendations.good
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`VPNSpan API server running on port ${PORT}`)
  console.log(`Data directory: ${DATA_DIR}`)
})

export default app
