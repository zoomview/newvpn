import { createContext, useContext, useState, useEffect } from 'react'

// English translations
const en = {
  // Navigation
  nav: {
    dashboard: 'Dashboard',
    findVpn: 'Find VPN',
    compare: 'Compare',
    blog: 'Blog',
    about: 'About'
  },
  
  // Dashboard
  dashboard: {
    title: 'VPN Performance Dashboard',
    subtitle: 'Real-time monitoring of top VPN services',
    monitoredVpns: 'Monitored VPNs',
    onlineRate: 'Online Rate',
    avgSpeed: 'Avg Speed',
    avgLatency: 'Avg Latency',
    lastUpdated: 'Last updated',
    refresh: 'Refresh',
    allVpns: 'All VPNs'
  },
  
  // VPN Card
  vpn: {
    speed: 'Speed',
    latency: 'Latency',
    uptime: 'Uptime',
    streaming: 'Streaming',
    review: 'Review',
    data: 'Data',
    online: 'Online',
    degraded: 'Degraded',
    offline: 'Offline'
  },
  
  // Use Cases
  useCases: {
    streaming: 'Streaming',
    privacy: 'Privacy',
    gaming: 'Gaming'
  },
  
  // VPN Review
  review: {
    pricing: 'Pricing',
    monthly: 'Monthly',
    yearly: 'Yearly',
    bestValue: 'Best Value',
    save: 'Save',
    pros: 'Pros',
    cons: 'Cons',
    features: 'Technical Features',
    encryption: 'Encryption',
    protocols: 'Protocols',
    devices: 'Devices',
    loggingPolicy: 'Logging Policy',
    bestFor: 'Best For',
    getVpn: 'Get Deal'
  },
  
  // Blog
  blog: {
    title: 'VPN Blog',
    subtitle: 'Latest news, reviews, and guides about VPNs',
    readMore: 'Read More'
  },
  
  // Footer
  footer: {
    tagline: 'Real-time VPN Performance Monitoring',
    copyright: 'All rights reserved.',
    disclaimer: 'VPNSpan is an independent comparison platform. We may earn commissions from VPN services reviewed on this site.'
  },
  
  // Comparison
  comparison: {
    title: 'VPN Comparison',
    subtitle: 'Compare top VPN services across speed, privacy, streaming, and value',
    selectVpn: 'Select VPNs to Compare',
    radarChart: 'Radar Chart',
    detailedComparison: 'Detailed Comparison'
  },
  
  // Scenario Match
  scenario: {
    title: 'Find Your Perfect VPN',
    subtitle: 'Select your primary use case and we\'ll recommend the best VPN for you',
    streaming: 'Streaming & Entertainment',
    streamingDesc: 'Unlock geo-restricted content on Netflix, Disney+, HBO, and more',
    gaming: 'Gaming',
    gamingDesc: 'Low latency, fast speeds for competitive gaming',
    privacy: 'Privacy & Security',
    privacyDesc: 'Maximum anonymity, no logs, strong encryption',
    remote: 'Remote Work',
    remoteDesc: 'Secure connection for working from home or public WiFi',
    travel: 'Travel',
    travelDesc: 'Access home content while traveling abroad',
    family: 'Family Use',
    familyDesc: 'Protect all family devices with unlimited connections',
    matchScore: 'Match Score',
    viewReview: 'View Review',
    compareAll: 'Compare All VPNs'
  }
}

// Chinese translations
const zh = {
  // Navigation
  nav: {
    dashboard: '仪表盘',
    findVpn: '选择VPN',
    compare: '对比',
    blog: '博客',
    about: '关于'
  },
  
  // Dashboard
  dashboard: {
    title: 'VPN性能监控面板',
    subtitle: '实时监控顶级VPN服务',
    monitoredVpns: '监控VPN',
    onlineRate: '在线率',
    avgSpeed: '平均速度',
    avgLatency: '平均延迟',
    lastUpdated: '最后更新',
    refresh: '刷新',
    allVpns: '所有VPN'
  },
  
  // VPN Card
  vpn: {
    speed: '速度',
    latency: '延迟',
    uptime: '可用率',
    streaming: '流媒体',
    review: '评测',
    data: '数据',
    online: '在线',
    degraded: '降级',
    offline: '离线'
  },
  
  // Use Cases
  useCases: {
    streaming: '流媒体',
    privacy: '隐私',
    gaming: '游戏'
  },
  
  // VPN Review
  review: {
    pricing: '价格',
    monthly: '月付',
    yearly: '年付',
    bestValue: '超值优惠',
    save: '节省',
    pros: '优点',
    cons: '缺点',
    features: '技术特性',
    encryption: '加密',
    protocols: '协议',
    devices: '设备数',
    loggingPolicy: '日志策略',
    bestFor: '适用场景',
    getVpn: '获取优惠'
  },
  
  // Blog
  blog: {
    title: 'VPN博客',
    subtitle: '最新的VPN新闻、评测和指南',
    readMore: '阅读更多'
  },
  
  // Footer
  footer: {
    tagline: '实时VPN性能监控',
    copyright: '版权所有。',
    disclaimer: 'VPNSpan是一个独立的比较平台。我们可能会从评测的VPN服务中获得佣金。'
  },
  
  // Comparison
  comparison: {
    title: 'VPN对比',
    subtitle: '比较顶级VPN服务的速度、隐私、流媒体和性价比',
    selectVpn: '选择要对比的VPN',
    radarChart: '雷达图',
    detailedComparison: '详细对比'
  },
  
  // Scenario Match
  scenario: {
    title: '找到最适合您的VPN',
    subtitle: '选择您的使用场景，我们将为您推荐最佳VPN',
    streaming: '流媒体与娱乐',
    streamingDesc: '解锁Netflix、Disney+、HBO等地区的受限内容',
    gaming: '游戏',
    gamingDesc: '低延迟、快速连接，适合竞技游戏',
    privacy: '隐私与安全',
    privacyDesc: '最大匿名性、无日志记录、强加密',
    remote: '远程工作',
    remoteDesc: '在家或公共WiFi下的安全连接',
    travel: '旅行',
    travelDesc: '在国外时访问家乡内容',
    family: '家庭使用',
    familyDesc: '保护全家设备，无限连接',
    matchScore: '匹配度',
    viewReview: '查看评测',
    compareAll: '对比所有VPN'
  }
}

const translations = { en, zh }

// Create context
const I18nContext = createContext()

// Provider component
export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('en')
  
  // Check browser language
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]
    if (browserLang === 'zh') {
      setLocale('zh')
    }
  }, [])
  
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }
  
  const changeLocale = (newLocale) => {
    if (translations[newLocale]) {
      setLocale(newLocale)
    }
  }
  
  return (
    <I18nContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

// Hook to use translations
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

// Language switcher component
export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  
  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      style={{
        padding: '6px 12px',
        borderRadius: '6px',
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  )
}

export default { I18nProvider, useI18n, LanguageSwitcher }
