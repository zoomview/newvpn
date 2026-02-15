// Related security products for cross-selling
// These products complement VPN usage and are relevant to the target audience

export const relatedProducts = {
  passwordManagers: {
    title: 'Best Password Managers',
    description: 'Pair your VPN with a password manager for complete online security.',
    products: [
      {
        id: '1password',
        name: '1Password',
        tagline: 'The best password manager for families',
        logo: '1P',
        color: '#0094f5',
        commission: '$2 + 25% first year',
        url: '/reviews/password-managers',
        rating: 4.9,
        price: '$2.99/month',
        features: ['Family sharing', 'Watchtower security', 'Travel mode']
      },
      {
        id: 'bitwarden',
        name: 'Bitwarden',
        tagline: 'Open-source password manager',
        logo: 'B',
        color: '#175dcf',
        commission: '25% recurring',
        url: '/reviews/password-managers',
        rating: 4.7,
        price: 'Free / $1/month',
        features: ['Open source', 'Self-hosted option', 'Free tier']
      }
    ]
  },
  antivirus: {
    title: 'Antivirus Software',
    description: 'Add an extra layer of protection to your devices.',
    products: [
      {
        id: 'kaspersky',
        name: 'Kaspersky',
        tagline: 'Award-winning protection',
        logo: 'K',
        color: '#0063c5',
        commission: '20%',
        url: '/reviews/antivirus',
        rating: 4.6,
        price: '$29.99/year',
        features: ['Real-time protection', 'VPN included', 'Password manager']
      },
      {
        id: 'norton',
        name: 'Norton',
        tagline: 'Comprehensive security suite',
        logo: 'N',
        color: '#f78f1e',
        commission: '20%',
        url: '/reviews/antivirus',
        rating: 4.5,
        price: '$49.99/year',
        features: ['Cloud backup', 'Dark web monitoring', 'LifeLock']
      }
    ]
  },
  browsers: {
    title: 'Privacy Browsers',
    description: 'Browse privately with security-focused browsers.',
    products: [
      {
        id: 'brave',
        name: 'Brave',
        tagline: 'Private and fast browsing',
        logo: 'B',
        color: '#fb542b',
        commission: '$5 per download',
        url: 'https://brave.com/',
        rating: 4.8,
        price: 'Free',
        features: ['Built-in ad blocker', 'Tor integration', 'BAT rewards']
      }
    ]
  }
}

export const getRelatedProducts = () => {
  return [
    ...relatedProducts.passwordManagers.products,
    ...relatedProducts.antivirus.products.slice(0, 2),
    ...relatedProducts.browsers.products.slice(0, 1)
  ]
}
