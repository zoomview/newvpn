import cron from 'node-cron'
import { testAllVPNs } from './vpn-tester.js'
import { runAllJitterTests, saveJitterResults, getJitterHistory } from './jitter-tester.js'
import { testAllVPNsStreaming } from './streaming-tester.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Determine paths
const isProduction = process.env.NODE_ENV === 'production'
const APP_ROOT = isProduction ? '/var/www/vpnspan/backend' : __dirname
const DATA_DIR = join(APP_ROOT, 'data')
const HISTORY_DIR = join(DATA_DIR, 'history')
const JITTER_DIR = join(DATA_DIR, 'jitter')

// VPN configurations - Only Surfshark enabled for real testing
const VPN_CONFIGS = [
    {
        id: 'expressvpn',
        name: 'ExpressVPN',
        website: 'https://www.expressvpn.com',
        enabled: false,  // Mock data only
    },
    {
        id: 'nordvpn',
        name: 'NordVPN',
        website: 'https://nordvpn.com',
        enabled: false,  // Mock data only
    },
    {
        id: 'surfshark',
        name: 'Surfshark',
        website: 'https://surfshark.com',
        configFile: process.env.SURFSHARK_OVPN_PATH || '/etc/openvpn/us-lax.prod.surfshark.com_tcp.ovpn',
        username: process.env.SURFSHARK_USER,
        password: process.env.SURFSHARK_PASS,
        enabled: !!(process.env.SURFSHARK_USER && process.env.SURFSHARK_PASS)  // REAL TESTING
    },
    {
        id: 'protonvpn',
        name: 'ProtonVPN',
        website: 'https://protonvpn.com',
        enabled: false,  // Disabled - free account, low bandwidth
    },
    {
        id: 'cyberghost',
        name: 'CyberGhost',
        website: 'https://cyberghost.com',
        enabled: false,  // Mock data only
    }
]

console.log('VPNSpan Monitor Starting...')
console.log('VPN Configurations:')
VPN_CONFIGS.forEach(vpn => {
    console.log(`  - ${vpn.name}: ${vpn.enabled ? 'ENABLED' : 'DISABLED' }`)
})

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
if (!fs.existsSync(HISTORY_DIR)) fs.mkdirSync(HISTORY_DIR, { recursive: true })
if (!fs.existsSync(JITTER_DIR)) fs.mkdirSync(JITTER_DIR, { recursive: true })

// Function to run speed monitoring (every 30 minutes)
async function runSpeedMonitoring() {
    console.log(`\n[${new Date().toISOString()}] Running VPN speed monitoring...`)
    
    try {
        const results = await testAllVPNs(VPN_CONFIGS)
        
        // Save current status
        const statusFile = join(DATA_DIR, 'vpn-status.json')
        fs.writeFileSync(statusFile, JSON.stringify(results, null, 2))
        console.log(`Saved VPN status to ${statusFile}`)
        
        // Save history for each VPN
        results.forEach(vpn => {
            const historyFile = join(HISTORY_DIR, `${vpn.id}.json`)
            let history = []
            
            // Read existing history
            if (fs.existsSync(historyFile)) {
                try {
                    history = JSON.parse(fs.readFileSync(historyFile, 'utf-8'))
                } catch (e) {
                    history = []
                }
            }
            
            // Add new data point
            history.push({
                time: new Date().toISOString(),
                speed: vpn.speed,
                latency: vpn.latency,
                uptime: vpn.uptime
            })
            
            // Keep only last 7 days (288 points at 30 min intervals = 7 days)
            if (history.length > 336) {
                history = history.slice(-336)
            }
            
            // Save updated history
            fs.writeFileSync(historyFile, JSON.stringify(history, null, 2))
        })
        
        console.log(`[${new Date().toISOString()}] Speed monitoring complete!`)
    } catch (error) {
        console.error('Error during speed monitoring:', error)
    }
}

// Function to run jitter tests (once daily at 3 AM)
async function runJitterMonitoring() {
    console.log(`\n[${new Date().toISOString()}] Running jitter tests...`)
    
    try {
        const results = await runAllJitterTests(VPN_CONFIGS)
        
        // Save jitter results
        saveJitterResults(results, DATA_DIR)
        
        console.log(`[${new Date().toISOString()}] Jitter testing complete!`)
    } catch (error) {
        console.error('Error during jitter testing:', error)
    }
}

// Function to run streaming tests (twice daily at 8 AM and 8 PM)
async function runStreamingMonitoring() {
    console.log(`\n[${new Date().toISOString()}] Running streaming tests...`)
    
    try {
        const results = await testAllVPNsStreaming(VPN_CONFIGS)
        
        // Save streaming results
        const streamingFile = join(DATA_DIR, 'streaming-status.json')
        fs.writeFileSync(streamingFile, JSON.stringify(results, null, 2))
        console.log(`Saved streaming status to ${streamingFile}`)
        
        console.log(`[${new Date().toISOString()}] Streaming testing complete!`)
    } catch (error) {
        console.error('Error during streaming testing:', error)
    }
}

// Schedule: Speed test every 30 minutes
const SPEED_SCHEDULE = '*/30 * * * *'

// Schedule: Jitter test once daily at 10 AM Beijing time (02:00 UTC)
const JITTER_SCHEDULE = '0 2 * * *'

// Schedule: Streaming test twice daily at 8 AM and 8 PM Beijing time (00:00 and 12:00 UTC)
const STREAMING_SCHEDULE = '0 0,12 * * *'

console.log(`\nScheduler configured (Beijing Time UTC+8):`)
console.log(`  - Speed monitoring: every 30 minutes (${SPEED_SCHEDULE})`)
console.log(`  - Jitter testing: daily at 10 AM Beijing (${JITTER_SCHEDULE})`)
console.log(`  - Streaming testing: twice daily at 8 AM & 8 PM Beijing (${STREAMING_SCHEDULE})`)

// Run speed monitoring immediately on start
runSpeedMonitoring()

// Run streaming test on start (quick test)
runStreamingMonitoring()

// Schedule recurring runs
cron.schedule(SPEED_SCHEDULE, runSpeedMonitoring)
cron.schedule(JITTER_SCHEDULE, runJitterMonitoring)
cron.schedule(STREAMING_SCHEDULE, runStreamingMonitoring)

console.log('\nVPNSpan Monitor is running. Press Ctrl+C to stop.')
