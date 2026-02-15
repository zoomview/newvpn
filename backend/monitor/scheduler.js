import cron from 'node-cron'
import { testAllVPNs } from './vpn-tester.js'
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

// Function to run monitoring
async function runMonitoring() {
    console.log(`\n[${new Date().toISOString()}] Running VPN monitoring...`)
    
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
        
        console.log(`[${new Date().toISOString()}] Monitoring complete!`)
    } catch (error) {
        console.error('Error during monitoring:', error)
    }
}

// Schedule: Run every 30 minutes
const SCHEDULE = '*/30 * * * *'

console.log(`\nScheduler configured to run every 30 minutes`)
console.log(`Schedule: ${SCHEDULE}`)

// Run immediately on start
runMonitoring()

// Schedule recurring runs
cron.schedule(SCHEDULE, runMonitoring)

console.log('\nVPNSpan Monitor is running. Press Ctrl+C to stop.')
