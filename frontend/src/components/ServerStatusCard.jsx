import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Server, Globe, Zap } from 'lucide-react'

// Load level colors and labels
function getLoadInfo(load) {
  if (load < 30) return { color: '#22c55e', label: 'Low', bg: '#dcfce7' }
  if (load < 60) return { color: '#f59e0b', label: 'Medium', bg: '#fef3c7' }
  return { color: '#ef4444', label: 'High', bg: '#fee2e2' }
}

function CountryFlag({ code }) {
  // Use emoji flags for common countries
  const flags = {
    US: '🇺🇸', GB: '🇬🇧', DE: '🇩🇪', NL: '🇳🇱', JP: '🇯🇵', SG: '🇸🇬',
    AU: '🇦🇺', CA: '🇨🇦', FR: '🇫🇷', BR: '🇧🇷', CH: '🇨🇭', IT: '🇮🇹',
    ES: '🇪🇸', SE: '🇸🇪', NO: '🇳🇴', DK: '🇩🇰', BE: '🇧🇪', AT: '🇦🇹',
    PL: '🇵🇱', IE: '🇮🇪', IN: '🇮🇳', KR: '🇰🇷', HK: '🇭🇰', TW: '🇹🇼',
    NZ: '🇳🇿', MX: '🇲🇽', AR: '🇦🇷', CL: '🇨🇱', ZA: '🇿🇦', EG: '🇪🇬',
    IL: '🇮🇱', RU: '🇷🇺', TR: '🇹🇷', UA: '🇺🇦', CZ: '🇨🇿', HU: '🇭🇺',
    RO: '🇷🇴', BG: '🇧🇬', GR: '🇬🇷', PT: '🇵🇹', FI: '🇫🇮', IS: '🇮🇸'
  }
  return flags[code] || '🌍'
}

function ServerStatusCard({ vpnId }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/vpn/servers/${vpnId}`)
        if (!response.ok) throw new Error('Failed to fetch')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [vpnId])

  if (loading) {
    return (
      <div className="server-status-card">
        <div className="loading-skeleton">
          <div className="skeleton-line" style={{ width: '60%' }}></div>
          <div className="skeleton-line" style={{ width: '40%' }}></div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="server-status-card error">
        <p>Unable to load server data</p>
      </div>
    )
  }

  const displayCountries = expanded ? data.serversByCountry : data.serversByCountry.slice(0, 5)

  return (
    <div className="server-status-card">
      {/* Summary Header */}
      <div className="server-status-header">
        <div className="stat-item">
          <Server size={18} />
          <div>
            <span className="stat-value">{data.totalServers.toLocaleString()}</span>
            <span className="stat-label">Servers</span>
          </div>
        </div>
        <div className="stat-item">
          <Globe size={18} />
          <div>
            <span className="stat-value">{data.countries}</span>
            <span className="stat-label">Countries</span>
          </div>
        </div>
      </div>

      {/* Country List */}
      <div className="country-list">
        <div className="country-list-header">
          <span>Server Locations</span>
          <span className="toggle-hint">
            {expanded ? 'Show less' : `+${data.serversByCountry.length - 5} more`}
          </span>
        </div>
        
        {displayCountries.map((country, idx) => {
          const loadInfo = getLoadInfo(country.load)
          return (
            <div key={idx} className="country-row">
              <div className="country-info">
                <span className="flag">{CountryFlag({ code: country.countryCode })}</span>
                <span className="country-name">{country.country}</span>
              </div>
              <div className="country-stats">
                <span className="server-count">{country.servers}</span>
                <span 
                  className="load-badge"
                  style={{ 
                    backgroundColor: loadInfo.bg,
                    color: loadInfo.color 
                  }}
                >
                  <Zap size={10} />
                  {country.load}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Expand/Collapse */}
      {data.serversByCountry.length > 5 && (
        <button 
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>Show Less <ChevronUp size={16} /></>
          ) : (
            <>View All Locations <ChevronDown size={16} /></>
          )}
        </button>
      )}
    </div>
  )
}

export default ServerStatusCard
