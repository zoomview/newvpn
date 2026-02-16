/**
 * Surfshark Server Data Fetcher
 * 
 * IMPORTANT NOTES:
 * - This module fetches GLOBAL Surfshark server data (not user-specific)
 * - User's available servers (34 in this case) must be manually configured
 * - API source: https://api.surfshark.com/v4/server/clusters
 * 
 * Data status:
 * - Global server list: ✅ REAL (from API)
 * - Server load/status: ✅ REAL (from API)  
 * - User's servers: ⚠️ MUST BE CONFIGURED MANUALLY
 */

import https from 'https';

// Your account's specific servers (manually configured)
// These are the servers available in YOUR account
const USER_CONFIGURED_SERVERS = {
  'germany': ['Berlin-1', 'Frankfurt-1', 'Munich-1', 'Hamburg-1', 'Dusseldorf-1', 'Stuttgart-1', 'Leipzig-1'],
  'japan': ['Tokyo-1', 'Tokyo-2', 'Tokyo-3', 'Osaka-1', 'Osaka-2', 'Nagoya-1', 'Fukuoka-1', 'Sapporo-1', 'Kyoto-1', 'Yokohama-1', 'Kobe-1', 'Hiroshima-1'],
  'netherlands': ['Amsterdam-1'],
  'singapore': ['Singapore-1', 'Singapore-2', 'Singapore-3', 'Singapore-4', 'Singapore-5', 'Singapore-6'],
  'usa': ['New York-1', 'Los Angeles-1', 'San Francisco-1', 'Chicago-1', 'Miami-1'],
  'uk': ['London-1', 'London-2', 'Manchester-1', 'Birmingham-1', 'Edinburgh-1']
};

/**
 * Fetch real Surfshark server data from API (using http module for Node 18 compatibility)
 * @returns {Promise<Array>} Array of server objects
 */
function fetchSurfsharkServers() {
  return new Promise((resolve, reject) => {
    const req = https.get('https://api.surfshark.com/v4/server/clusters', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const servers = JSON.parse(data);
          console.log(`[Surfshark API] Fetched ${servers.length} global servers`);
          resolve(servers);
        } catch (e) {
          reject(new Error('Failed to parse API response'));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Get servers by country code
 * @param {Array} allServers - All servers from API
 * @param {string} countryCode - Country code (e.g., 'US', 'DE')
 * @returns {Array} Servers in that country
 */
export function getServersByCountry(allServers, countryCode) {
  return allServers.filter(s => s.countryCode === countryCode);
}

/**
 * Map user-configured servers to API server data
 * This matches user's manual list to API data for real-time status
 * @param {Array} allServers - All servers from API
 * @param {Object} userServers - User's configured servers
 * @returns {Object} User's servers with real-time status
 */
export function mapUserServersToAPI(allServers, userServers) {
  const result = {
    germany: [],
    japan: [],
    netherlands: [],
    singapore: [],
    usa: [],
    uk: []
  };
  
  const countryMap = {
    'germany': 'DE',
    'japan': 'JP', 
    'netherlands': 'NL',
    'singapore': 'SG',
    'usa': 'US',
    'uk': 'GB'
  };
  
  for (const [region, serverNames] of Object.entries(userServers)) {
    const apiServers = allServers.filter(s => s.countryCode === countryMap[region]);
    
    for (const name of serverNames) {
      // Try to find matching server in API
      const matched = apiServers.find(s => 
        s.location?.toLowerCase().includes(name.toLowerCase().split('-')[0]) ||
        s.city?.toLowerCase().includes(name.toLowerCase().split('-')[0])
      );
      
      if (matched) {
        result[region].push({
          name: name,
          location: matched.location || matched.city || name,
          load: matched.load || 0,
          status: matched.load < 100 ? 'online' : 'full',
          country: matched.country,
          countryCode: matched.countryCode,
          updatedAt: matched.updatedAt
        });
      } else {
        // Server not found in API - mark as unknown
        result[region].push({
          name: name,
          location: name,
          load: null,
          status: 'unknown',
          country: region.charAt(0).toUpperCase() + region.slice(1),
          countryCode: countryMap[region],
          note: 'Not found in global API - may be account-specific'
        });
      }
    }
  }
  
  return result;
}

/**
 * Get summary statistics for user's servers
 * @param {Object} userServersWithStatus - User's servers with status
 * @returns {Object} Summary statistics
 */
export function getServerSummary(userServersWithStatus) {
  let total = 0;
  let online = 0;
  let unknown = 0;
  const byCountry = {};
  
  for (const [region, servers] of Object.entries(userServersWithStatus)) {
    byCountry[region] = { total: 0, online: 0 };
    
    for (const server of servers) {
      total++;
      byCountry[region].total++;
      
      if (server.status === 'online') {
        online++;
        byCountry[region].online++;
      } else if (server.status === 'unknown') {
        unknown++;
      }
    }
  }
  
  return {
    total,
    online,
    offline: total - online - unknown,
    unknown,
    onlineRate: total > 0 ? Math.round((online / total) * 100) : 0,
    byCountry
  };
}

/**
 * Main function to get user's server data with real-time status
 * @returns {Object} User's servers with real-time status and summary
 */
export async function getUserSurfsharkData() {
  console.log('[Surfshark] Fetching global server data...');
  
  const globalServers = await fetchSurfsharkServers();
  
  if (globalServers.length === 0) {
    console.warn('[Surfshark] Could not fetch global servers, using offline data');
    return {
      servers: USER_CONFIGURED_SERVERS,
      summary: { error: 'Could not fetch real-time data' },
      note: 'Data may be outdated - API fetch failed'
    };
  }
  
  const userServersWithStatus = mapUserServersToAPI(globalServers, USER_CONFIGURED_SERVERS);
  const summary = getServerSummary(userServersWithStatus);
  
  console.log(`[Surfshark] User has ${summary.total} servers, ${summary.online} online (${summary.onlineRate}%)`);
  
  return {
    servers: userServersWithStatus,
    summary,
    globalServerCount: globalServers.length,
    lastUpdated: new Date().toISOString(),
    note: 'Global server data from API, matched with user account servers'
  };
}

// For testing
// getUserSurfsharkData().then(console.log).catch(console.error);

export default {
  fetchSurfsharkServers,
  getUserSurfsharkData,
  USER_CONFIGURED_SERVERS
};
