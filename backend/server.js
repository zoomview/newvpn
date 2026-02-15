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

// Get single VPN detail
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

// Refresh VPN data (manual trigger)
app.post('/api/vpn/refresh', (req, res) => {
  try {
    // In a real implementation, this would trigger the VPN tester
    // For now, we just return success
    res.json({ success: true, message: 'Refresh triggered' })
  } catch (error) {
    console.error('Error refreshing VPN data:', error)
    res.status(500).json({ error: 'Failed to refresh VPN data' })
  }
})

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
