import { Shield } from 'lucide-react'

function LogoIcon() {
  return (
    <div style={{
      width: '36px',
      height: '36px',
      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Shield size={20} color="white" />
    </div>
  )
}

export default LogoIcon
