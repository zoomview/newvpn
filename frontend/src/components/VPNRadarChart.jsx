import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'

// Six dimensions for VPN comparison
export const vpnDimensions = [
  { key: 'speed', label: 'Speed', fullLabel: 'Connection Speed', weight: 0.30 },
  { key: 'stability', label: 'Stability', fullLabel: 'Connection Stability', weight: 0.25 },
  { key: 'privacy', label: 'Privacy', fullLabel: 'Privacy & Security', weight: 0.20 },
  { key: 'streaming', label: 'Streaming', fullLabel: 'Streaming Support', weight: 0.15 },
  { key: 'value', label: 'Value', fullLabel: 'Price Value', weight: 0.10 }
]

// VPN radar data - normalized to 0-100 scale
export const vpnRadarData = {
  expressvpn: {
    id: 'expressvpn',
    name: 'ExpressVPN',
    speed: 95,      // Fastest speeds
    stability: 90,   // Excellent stability
    privacy: 95,    // BVI, audited
    streaming: 95,   // Best streaming
    value: 70       // Premium pricing
  },
  nordvpn: {
    id: 'nordvpn',
    name: 'NordVPN',
    speed: 88,       // Very fast with NordLynx
    stability: 85,   // Good stability
    privacy: 92,     // Panama, audited
    streaming: 90,   // SmartPlay
    value: 80        // Good value
  },
  surfshark: {
    id: 'surfshark',
    name: 'Surfshark',
    speed: 75,       // Good speeds
    stability: 80,   // Good stability
    privacy: 85,     // Netherlands, audited
    streaming: 85,   // Good streaming
    value: 95        // Best value
  },
  protonvpn: {
    id: 'protonvpn',
    name: 'ProtonVPN',
    speed: 65,       // Variable speeds
    stability: 75,   // Moderate
    privacy: 98,     // Swiss, open-source
    streaming: 60,   // Limited on free
    value: 85        // Free tier available
  },
  cyberghost: {
    id: 'cyberghost',
    name: 'CyberGhost',
    speed: 72,       // Moderate speeds
    stability: 75,   // Moderate
    privacy: 75,     // Romania concerns
    streaming: 90,   // Dedicated servers
    value: 85        // Good value
  }
}

// Format data for radar chart
export function formatRadarData(vpnIds) {
  const data = vpnIds.map(id => vpnRadarData[id]).filter(Boolean)
  
  if (data.length === 0) return []
  
  // Create combined data structure
  const result = vpnDimensions.map(dim => {
    const point = { dimension: dim.label }
    data.forEach(vpn => {
      point[vpn.name] = vpn[dim.key]
    })
    return point
  })
  
  return result
}

// Color palette for VPNs
export const vpnColors = {
  expressvpn: '#E51E28',
  nordvpn: '#4687D8',
  surfshark: '#23A8F0',
  protonvpn: '#6D4AFF',
  cyberghost: '#714674'
}

// Get radar chart colors
export function getRadarColors(vpnIds) {
  return vpnIds.map(id => vpnColors[id] || '#6b7280')
}

// Render radar chart
function VPNRadarChart({ vpnIds = ['surfshark', 'nordvpn', 'expressvpn'], height = 400 }) {
  const data = formatRadarData(vpnIds)
  const colors = getRadarColors(vpnIds)
  const vpns = vpnIds.map(id => vpnRadarData[id]).filter(Boolean)
  
  if (data.length === 0) {
    return <div>No data available</div>
  }
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis 
          dataKey="dimension" 
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]} 
          tick={{ fill: '#6B7280', fontSize: 10 }}
          axisLine={false}
        />
        {vpns.map((vpn, index) => (
          <Radar
            key={vpn.id}
            name={vpn.name}
            dataKey={vpn.name}
            stroke={colors[index]}
            fill={colors[index]}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        ))}
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span style={{ color: '#E5E7EB' }}>{value}</span>}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#E5E7EB'
          }}
          formatter={(value) => [`${value}/100`, 'Score']}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default VPNRadarChart
