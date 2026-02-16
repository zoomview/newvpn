/**
 * Streaming Tester Module
 * Tests VPN ability to unblock streaming services
 * 
 * Supported services:
 * - Netflix (various regions)
 * - YouTube
 * - Disney+
 * - Hulu
 * - BBC iPlayer
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Streaming test URLs (public test endpoints)
const STREAMING_URLS = {
    netflix: {
        url: 'https://www.netflix.com/title/80018499', // Test title
        check: 'netflix.com',
        name: 'Netflix'
    },
    youtube: {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        check: 'youtube.com',
        name: 'YouTube'
    },
    disney: {
        url: 'https://www.disneyplus.com/movies/avatar/4g6l5w3l3j5l',
        check: 'disneyplus.com',
        name: 'Disney+'
    },
    hulu: {
        url: 'https://www.hulu.com/series/the-dropout',
        check: 'hulu.com',
        name: 'Hulu'
    },
    bbc: {
        url: 'https://www.bbc.co.uk/iplayer',
        check: 'bbc.co.uk',
        name: 'BBC iPlayer'
    }
}

// VPN-specific server recommendations for streaming
const STREAMING_SERVERS = {
    expressvpn: {
        netflix: ['us-west', 'us-east', 'uk', 'jp'],
        youtube: ['any'],
        disney: ['us', 'ca', 'uk'],
        hulu: ['us-west', 'us-east'],
        bbc: ['uk']
    },
    nordvpn: {
        netflix: ['us', 'uk', 'jp', 'ca'],
        youtube: ['any'],
        disney: ['us', 'ca'],
        hulu: ['us'],
        bbc: ['uk']
    },
    surfshark: {
        netflix: ['us', 'uk', 'jp', 'kr'],
        youtube: ['any'],
        disney: ['us', 'uk'],
        hulu: ['us'],
        bbc: ['uk']
    },
    protonvpn: {
        netflix: ['us', 'uk'], // Premium only
        youtube: ['any'],
        disney: false,
        hulu: false,
        bbc: ['uk']
    },
    cyberghost: {
        netflix: ['us', 'uk', 'de', 'fr'],
        youtube: ['any'],
        disney: ['us', 'uk', 'de'],
        hulu: ['us'],
        bbc: ['uk']
    }
}

/**
 * Test streaming service accessibility via curl
 * Note: This is a basic connectivity test, not full streaming verification
 */
async function testStreamingService(serviceKey) {
    const service = STREAMING_URLS[serviceKey]
    if (!service) {
        return { service: serviceKey, accessible: false, error: 'Unknown service' }
    }
    
    try {
        // Use curl to check if we can reach the service
        // Note: This only tests connectivity, not actual unblocking
        const cmd = process.platform === 'win32'
            ? `curl -s -o nul -w "%{http_code}" --connect-timeout 10 "${service.url}"`
            : `curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 "${service.url}"`
        
        const { stdout, stderr } = await execAsync(cmd, { timeout: 15000 })
        const httpCode = parseInt(stdout.trim()) || 0
        
        // Consider accessible if we get a valid HTTP response
        const accessible = httpCode >= 200 && httpCode < 500
        
        return {
            service: serviceKey,
            name: service.name,
            accessible,
            httpCode,
            timestamp: new Date().toISOString()
        }
    } catch (error) {
        return {
            service: serviceKey,
            name: service.name,
            accessible: false,
            error: error.message,
            timestamp: new Date().toISOString()
        }
    }
}

/**
 * Test all streaming services for a VPN
 */
export async function testStreamingForVPN(vpnId, vpnEnabled = false) {
    console.log(`\n  Testing streaming services for ${vpnId}...`)
    
    const results = {
        vpnId,
        timestamp: new Date().toISOString(),
        services: {}
    }
    
    // If VPN is not enabled, return known capabilities
    if (!vpnEnabled) {
        const capabilities = STREAMING_SERVERS[vpnId] || {}
        
        for (const [service, data] of Object.entries(STREAMING_URLS)) {
            results.services[service] = {
                name: data.name,
                accessible: capabilities[service] !== false,
                method: 'known-capability',
                servers: capabilities[service] || []
            }
        }
        
        console.log(`  ✓ Streaming capabilities based on known data`)
        return results
    }
    
    // For enabled VPNs, test actual connectivity
    const testPromises = Object.keys(STREAMING_URLS).map(async (service) => {
        const result = await testStreamingService(service)
        results.services[service] = {
            name: result.name,
            accessible: result.accessible,
            httpCode: result.httpCode,
            method: 'connectivity-test'
        }
    })
    
    await Promise.all(testPromises)
    
    const accessibleCount = Object.values(results.services).filter(s => s.accessible).length
    console.log(`  ✓ ${accessibleCount}/${Object.keys(STREAMING_URLS).length} services accessible`)
    
    return results
}

/**
 * Get streaming recommendations for a VPN
 */
export function getStreamingRecommendations(vpnId) {
    const servers = STREAMING_SERVERS[vpnId]
    if (!servers) return null
    
    const recommendations = []
    
    for (const [service, serviceServers] of Object.entries(servers)) {
        if (serviceServers === false) continue
        
        const serviceInfo = STREAMING_URLS[service]
        recommendations.push({
            service,
            name: serviceInfo?.name || service,
            recommendedServers: serviceServers,
            tip: getServerTip(service, serviceServers)
        })
    }
    
    return recommendations
}

/**
 * Get server recommendation tip
 */
function getServerTip(service, servers) {
    if (servers === true || servers.includes('any')) {
        return 'Any server works well'
    }
    
    if (service === 'netflix') {
        return `Recommended: ${servers.slice(0, 2).join(' or ')} servers`
    }
    
    if (service === 'bbc') {
        return 'Use UK server for best results'
    }
    
    return `Try: ${servers[0]} server`
}

/**
 * Test all VPNs streaming capabilities
 */
export async function testAllVPNsStreaming(vpnConfigs) {
    console.log(`\n===========================================`)
    console.log(`Testing streaming for ${vpnConfigs.length} VPNs`)
    console.log(`===========================================`)
    
    const results = []
    
    for (const vpn of vpnConfigs) {
        try {
            const result = await testStreamingForVPN(vpn.id, vpn.enabled)
            results.push(result)
        } catch (error) {
            console.error(`  ✗ Streaming test failed for ${vpn.name}:`, error.message)
            results.push({
                vpnId: vpn.id,
                timestamp: new Date().toISOString(),
                error: error.message,
                services: {}
            })
        }
    }
    
    return results
}

export default {
    testStreamingForVPN,
    testAllVPNsStreaming,
    getStreamingRecommendations,
    STREAMING_URLS,
    STREAMING_SERVERS
}
