# VPNSpan 项目完整规格说明书

## 一、项目概述

### 1.1 项目定位

VPNSpan 是一个**实时VPN性能监控平台**，通过自动化测试客观评估主流VPN服务商的质量，帮助用户做出明智的购买决策，同时通过联盟营销赚取佣金。

### 1.2 核心功能

| 功能 | 描述 |
|------|------|
| **VPN性能监控** | 每30分钟自动测试VPN的网速、延迟、稳定性 |
| **实时状态面板** | 展示所有VPN的在线状态、速度、延迟、节点数 |
| **历史趋势图表** | 24小时/7天性能趋势可视化（折线图） |
| **流媒体解锁测试** | 检测Netflix、YouTube、Disney+等流媒体支持 |
| **VPN评测文章** | 每个VPN的详细评测、优缺点、价格信息 |
| **联盟链接** | 导向VPN官网的推广链接（赚取佣金） |

### 1.3 监控的VPN服务商

当前监控5个主流VPN：

| VPN | 定位 | 月费 | 特点 |
|-----|------|------|------|
| ExpressVPN | 高端 | $12.95 | 行业标杆，最快速度 |
| NordVPN | 高端 | $11.99 | 最大服务器网络，安全功能强 |
| Surfshark | 性价比 | $1.99 | 无限设备连接 |
| ProtonVPN | 隐私 | $4.99 | 瑞士隐私保护，有免费版 |
| CyberGhost | 入门 | $2.03 | 界面友好，优化流媒体 |

---

## 二、技术架构

### 2.1 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| **前端框架** | React | 18.3.1 |
| **构建工具** | Vite | 5.3.4 |
| **路由** | react-router-dom | 6.26.0 |
| **图表** | recharts | 2.12.7 |
| **图标** | lucide-react | 0.400.0 |
| **HTTP客户端** | axios | 1.7.2 |
| **后端框架** | Express | 4.18.2 |
| **定时任务** | node-cron | 3.0.3 |
| **包管理** | npm | - |

### 2.2 项目结构

```
vpnspan/
├── frontend/                     # React前端
│   ├── src/
│   │   ├── components/          # 组件
│   │   │   ├── Header.jsx       # 顶部导航
│   │   │   └── LogoIcon.jsx    # Logo图标
│   │   ├── pages/              # 页面
│   │   │   ├── Dashboard.jsx   # 监控面板主页
│   │   │   ├── VPNDetail.jsx   # VPN详情页（含图表）
│   │   │   ├── VPNReview.jsx   # VPN评测页
│   │   │   ├── Blog.jsx        # 博客列表
│   │   │   ├── BlogPost.jsx    # 博客文章
│   │   │   ├── About.jsx       # 关于页面
│   │   │   ├── Privacy.jsx     # 隐私政策
│   │   │   └── Terms.jsx       # 服务条款
│   │   ├── App.jsx             # 路由配置
│   │   ├── main.jsx            # 入口文件
│   │   └── index.css           # 全局样式（深色主题）
│   ├── public/
│   │   └── sitemap.xml         # SEO站点地图
│   ├── package.json
│   └── vite.config.js          # Vite配置
│
├── backend/                     # Node.js后端
│   ├── server.js                # Express主服务
│   ├── monitor/                 # VPN监控模块
│   │   ├── scheduler.js        # 定时任务调度
│   │   └── vpn-tester.js       # VPN测试逻辑
│   ├── data/                    # 数据存储
│   │   ├── vpn-status.json      # VPN当前状态
│   │   └── history/            # 历史数据
│   │       └── surfshark.json  # 某个VPN的历史
│   ├── .env                    # 环境变量（含VPN账号）
│   └── package.json
│
├── docker-compose.yml           # Docker编排
└── package.json                 # 根目录脚本
```

### 2.3 开发命令

```bash
# 同时启动前端+后端
npm run dev

# 单独启动前端 (http://localhost:3000)
npm run dev:frontend

# 单独启动后端 (http://localhost:5000)
npm run dev:backend

# 构建生产版本
npm run build

# 启动后端监控调度器
cd backend && npm run monitor
```

---

## 三、页面详细规格

### 3.1 首页 Dashboard (`/`)

**路径**: `frontend/src/pages/Dashboard.jsx`

**功能**:
- 顶部统计卡片：监控VPN数量、在线率、平均速度、最后更新时间
- 刷新按钮：手动触发数据刷新
- VPN性能矩阵表格

**表格列**:
| 列名 | 内容 |
|------|------|
| Provider | VPN名称 + 图标 |
| Status | 在线/降级/离线 状态指示器 |
| Uptime | 可用率百分比 + 进度条 |
| Speed | 速度(Mbps) + 闪电图标 |
| Latency | 延迟(ms)，颜色区分 |
| Nodes | 在线节点/总节点 |
| Streaming | Netflix/YouTube/Disney+ 支持图标 |
| Actions | "Read Review" 和 "Data" 按钮 |

**统计数据源**: `/api/vpn/status`

---

### 3.2 VPN详情页 (`/vpn/:id`)

**路径**: `frontend/src/pages/VPNDetail.jsx`

**功能**:
- 返回按钮
- VPN名称 + 在线状态标签
- 4个指标卡片：Uptime、平均速度、延迟、节点状态
- 24小时性能趋势图表（使用 recharts）

**图表**:
- 下载速度折线图
- 延迟折线图

**附加信息**:
- 节点分布列表
- 流媒体解锁支持（Netflix、YouTube、Disney+、Hulu、BBC）
- 支持的协议（OpenVPN、WireGuard、IKEv2）
- 价格信息

**统计数据源**: `/api/vpn/:id`

---

### 3.3 VPN评测页 (`/reviews/:id`)

**路径**: `frontend/src/pages/VPNReview.jsx`

**功能**:
- VPN logo + 名称 + 标语
- 评分星级
- 实时数据横幅（速度、延迟、在线状态）
- CTA按钮：跳转VPN官网（联盟链接）
- 简介段落
- 优点列表（绿色勾选）
- 缺点列表（红色叉号）
- 价格卡片（月付/年付）
- 技术特性（加密方式、协议、日志策略、设备数、支持）

**评测数据**: 硬编码在 `vpnReviews` 对象中

---

### 3.4 其他页面

| 路径 | 文件 | 内容 |
|------|------|------|
| `/blog` | Blog.jsx | 博客列表 |
| `/blog/:slug` | BlogPost.jsx | 单篇博客 |
| `/about` | About.jsx | 关于我们 |
| `/privacy` | Privacy.jsx | 隐私政策 |
| `/terms` | Terms.jsx | 服务条款 |

---

## 四、API接口规格

### 4.1 获取所有VPN状态

```
GET /api/vpn/status
```

**响应**:
```json
[
  {
    "id": "expressvpn",
    "name": "ExpressVPN",
    "status": "online",
    "uptime": 98.5,
    "speed": 95,
    "latency": 18,
    "nodes": { "online": 50, "total": 52 },
    "streaming": { "netflix": true, "youtube": true, "disney": true },
    "lastChecked": "2026-02-14T10:00:00.000Z"
  }
]
```

### 4.2 获取单个VPN详情

```
GET /api/vpn/:id
```

**响应**:
```json
{
  "id": "surfshark",
  "name": "Surfshark",
  "currentStats": {
    "uptime": 92.3,
    "speed": 75,
    "latency": 42,
    "status": "degraded"
  },
  "history24h": [
    { "time": "10:00", "speed": 75, "latency": 42, "uptime": 92 },
    ...
  ],
  "nodes": {
    "total": 28,
    "online": 25,
    "locations": ["United States", "United Kingdom", ...]
  },
  "streaming": {
    "netflix": true,
    "youtube": true,
    "disney": false,
    "hulu": false,
    "bbc": true
  },
  "protocols": ["OpenVPN", "WireGuard", "IKEv2"],
  "pricing": {
    "monthly": 12.95,
    "yearly": 99.95,
    "currency": "USD"
  }
}
```

### 4.3 健康检查

```
GET /api/health
```

**响应**:
```json
{
  "status": "ok",
  "timestamp": "2026-02-14T10:00:00.000Z",
  "uptime": 3600
}
```

---

## 五、VPN测试账号配置

### 5.1 已配置的VPN

#### Surfshark（当前启用测试）

```
# .env 配置
SURFSHARK_USER=wYsxxz2JjWUxKCVRUESep2Lt
SURFSHARK_PASS=BCwqCpc4sbJKMpRZcJm3AaGX
SURFSHARK_OVPN_PATH=/etc/openvpn/us-lax.prod.surfshark.com_tcp.ovpn
```

#### ProtonVPN

```
PROTONVPN_USER=73GqNmISgumJYEyx+f1
PROTONVPN_PASS=Opjyt9zd14AnMR172BBEXIl3skh80FH8
PROTONVPN_OVPN_PATH=/etc/openvpn/protonvpn/us-free-110.protonvpn.tcp.ovpn
```

### 5.2 VPN配置模板

在 `backend/monitor/scheduler.js` 中配置：

```javascript
const VPN_CONFIGS = [
    {
        id: 'expressvpn',
        name: 'ExpressVPN',
        website: 'https://www.expressvpn.com',
        enabled: false,
        // 未来扩展：
        // clientCommand: 'expressvpn connect smart',
    },
    {
        id: 'nordvpn',
        name: 'NordVPN',
        website: 'https://nordvpn.com',
        enabled: false,
        // clientCommand: 'nordvpn connect United States',
    },
    {
        id: 'surfshark',
        name: 'Surfshark',
        website: 'https://surfshark.com',
        configFile: '/etc/openvpn/us-lax.prod.surfshark.com_tcp.ovpn',
        username: process.env.SURFSHARK_USER,
        password: process.env.SURFSHARK_PASS,
        enabled: true
    },
    // ...更多VPN
]
```

### 5.3 获取VPN配置文件的步骤

1. **注册VPN账号**
2. **下载OpenVPN配置文件**
   - ExpressVPN: https://www.expressvpn.com/subscriptions
   - NordVPN: https://my.nordaccount.com/dashboard/
   - Surfshark: https://my.surfshark.com/vpn/manual-setup/main
   - ProtonVPN: https://account.protonvpn.com/downloads
   - CyberGhost: https://my.cyberghost.online/

3. **获取OpenVPN凭证**
   - 部分VPN需要单独的OpenVPN用户名/密码
   - 在账户设置中查找"OpenVPN credentials"

4. **配置文件存放路径**
   - Linux: `/etc/openvpn/`
   - 容器内映射: 需在 docker-compose.yml 中配置 volumes

---

## 六、数据存储

### 6.1 数据目录结构

```
backend/data/
├── vpn-status.json          # 当前VPN状态（最新一次测试结果）
└── history/
    ├── surfshark.json       # Surfshark历史数据
    ├── nordvpn.json        # NordVPN历史数据
    └── ...
```

### 6.2 历史数据格式

```json
[
  {
    "time": "2026-02-14T10:00:00.000Z",
    "speed": 75,
    "latency": 42,
    "uptime": 92.3
  },
  ...
]
```

**保留策略**: 只保留最近7天数据（约336个点，每30分钟一个）

---

## 七、样式规格

### 7.1 深色主题配色

```css
:root {
  /* 背景色 */
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  
  /* 文字色 */
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  
  /* 强调色 */
  --accent-primary: #06b6d4;
  --accent-secondary: #0891b2;
  --accent-hover: #22d3ee;
  
  /* 状态色 */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  
  /* 其他 */
  --border-color: #334155;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}
```

### 7.2 字体

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## 八、部署配置

### 8.1 Docker部署

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./backend/data:/app/data
      - /etc/openvpn:/etc/openvpn:ro  # VPN配置
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    restart: unless-stopped
```

### 8.2 Nginx反向代理（生产环境）

```nginx
server {
    server_name vpnspan.com;
    
    # 前端静态文件
    location / {
        root /var/www/vpnspan/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # 后端API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8.3 生产环境变量

```bash
# 服务器上设置
export NODE_ENV=production
export PORT=5000

# VPN账号（如需测试更多VPN）
export SURFSHARK_USER=your_surfshark_user
export SURFSHARK_PASS=your_surfshark_pass
```

---

## 九、路由配置

```jsx
// App.jsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/vpn/:id" element={<VPNDetail />} />
  <Route path="/reviews/:id" element={<VPNReview />} />
  <Route path="/about" element={<About />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/blog/:slug" element={<BlogPost />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/terms" element={<Terms />} />
</Routes>
```

---

## 十、已知问题与限制

### 10.1 当前已知问题

| 问题 | 状态 | 说明 |
|------|------|------|
| server.js重复listen | 已修复 | 删除重复的app.listen()调用 |
| 端口5000占用 | 待解决 | 需确保单一node进程 |
| 历史数据路径 | 已修复 | 使用动态路径适配本地/生产 |

### 10.2 功能限制

- **VPN测试**: 目前仅Surfshark配置了真实账号，其他使用模拟数据
- **测试框架**: 未配置Jest/Vitest测试框架
- **代码规范**: 未配置ESLint/Prettier

### 10.3 未来改进方向

1. **增加更多VPN**: 启用ExpressVPN、NordVPN、ProtonVPN、Cyberghost的真实测试
2. **多地节点**: 在不同地区部署监控节点
3. **API公开**: 向公众开放API
4. **邮件告警**: VPN下线时发送邮件通知
5. **用户自定义**: 用户可自定义VPN对比

---

## 十一、SEO配置

### 11.1 站点地图

```xml
<!-- public/sitemap.xml -->
<urlset>
  <url>
    <loc>https://vpnspan.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vpnspan.com/reviews/expressvpn</loc>
    <priority>0.8</priority>
  </url>
  <!-- 更多URL -->
</urlset>
```

### 11.2 Meta标签

每个页面应包含:
- title
- meta description
- Open Graph标签（社交分享）

---

## 十二、联盟营销

### 12.1 联盟链接

每个VPN评测页包含指向VPN官网的联盟链接:

| VPN | 联盟链接 |
|-----|---------|
| ExpressVPN | https://www.expressvpn.com/ |
| NordVPN | https://nordvpn.com/ |
| Surfshark | https://surfshark.com/ |
| ProtonVPN | https://protonvpn.com/ |
| CyberGhost | https://cyberghost.com/ |

### 12.2 佣金说明

| VPN | 预计佣金 |
|-----|---------|
| ExpressVPN | ~$50/单 |
| NordVPN | ~$40/单 |
| Surfshark | ~$30/单 |
| ProtonVPN | ~$25/单 |
| CyberGhost | ~$25/单 |

**申请联盟计划**:
- ExpressVPN: https://www.expressvpn.com/affiliates
- NordVPN: https://nordvpn.com/affiliates
- Surfshark: https://surfshark.com/affiliates

---

## 十三、快速开始清单

### 开发环境

- [ ] Node.js 18+ 安装
- [ ] npm install（根目录 + frontend + backend）
- [ ] 启动开发服务器: `npm run dev`

### 生产部署

- [ ] 服务器（推荐2核2G，Ubuntu 20.04+）
- [ ] 安装Node.js和Docker
- [ ] 克隆项目到服务器
- [ ] 配置 .env 环境变量
- [ ] 构建前端: `npm run build`
- [ ] 启动Docker容器 或 手动启动服务
- [ ] 配置Nginx反向代理
- [ ] 配置SSL证书（Let's Encrypt）

### VPN测试扩展

- [ ] 注册VPN账号
- [ ] 下载OpenVPN配置文件到 `/etc/openvpn/`
- [ ] 在 .env 中配置VPN账号
- [ ] 在 scheduler.js 中设置 `enabled: true`
- [ ] 启动监控: `cd backend && npm run monitor`

---

## 十四、前端页面组件详情

### 14.1 App.jsx - 路由配置

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import VPNDetail from './pages/VPNDetail'
import VPNReview from './pages/VPNReview'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/vpn/:id" element={<VPNDetail />} />
                        <Route path="/reviews/:id" element={<VPNReview />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                    </Routes>
                </main>
                <footer style={{...}}>
                    <p>VPNSpan © 2026 - Real-time VPN Performance Monitoring</p>
                </footer>
            </div>
        </Router>
    )
}

export default App
```

### 14.2 main.jsx - 入口文件

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
```

### 14.3 Header.jsx - 顶部导航

- Logo + 品牌名（VPNSpan）
- 导航链接：Dashboard、Blog、About
- 吸顶效果，带模糊背景

### 14.4 vite.config.js - Vite配置

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

---

## 十五、后端服务详情

### 15.1 server.js - Express主服务

**关键特性**:
- 使用ES Modules (import/export)
- 动态路径检测（本地开发 vs 生产环境）
- CORS支持
- 三层错误处理

**路径检测逻辑**:
```javascript
const isProduction = process.env.NODE_ENV === 'production'
const APP_ROOT = isProduction 
    ? '/var/www/vpnspan/backend' 
    : __dirname
```

### 15.2 scheduler.js - 定时任务

- 使用 node-cron 每30分钟执行一次
- 遍历所有启用的VPN配置
- 调用 vpn-tester.js 进行测试
- 保存结果到 JSON 文件

### 15.3 vpn-tester.js - VPN测试逻辑

- OpenVPN连接管理
- 速度测试（使用 speedtest-cli 或备用方案）
- 延迟测试
- 流媒体解锁检测
- 异常处理和重试机制

### 15.4 数据文件路径

```
backend/data/
├── vpn-status.json          # 当前状态
└── history/
    └── {vpn-id}.json      # 每个VPN的历史
```

---

## 十六、package.json 配置

### 16.1 根目录 package.json

```json
{
  "name": "vpnspan",
  "version": "1.0.0",
  "description": "VPNSpan - Real-time VPN Performance Monitor",
  "type": "module",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build": "cd frontend && npm run build",
    "preview": "cd frontend && npm run preview"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

### 16.2 前端 package.json

```json
{
  "name": "vpnspan-frontend",
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "recharts": "^2.12.7",
    "lucide-react": "^0.400.0",
    "axios": "^1.7.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.4"
  }
}
```

### 16.3 后端 package.json

```json
{
  "name": "vpnspan-backend",
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "monitor": "node monitor/scheduler.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "node-cron": "^3.0.3",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

## 十七、Docker配置

### 17.1 Dockerfile (Frontend)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 17.2 Dockerfile (Backend)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### 17.3 docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./backend/data:/app/data
      - /etc/openvpn:/etc/openvpn:ro
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    restart: unless-stopped
```

---

## 十八、监控与运维

### 18.1 PM2进程管理

```bash
# 启动后端
pm2 start backend/server.js --name vpnspan-backend

# 查看状态
pm2 status

# 查看日志
pm2 logs vpnspan-backend

# 重启
pm2 restart vpnspan-backend
```

### 18.2 日志管理

```bash
# 查看实时日志
pm2 logs

# 清空日志
pm2 flush

# 导出日志
pm2 logs --out > vpnspan-logs.txt
```

### 18.3 健康检查

```bash
# API健康检查
curl http://localhost:5000/api/health

# 系统状态
curl http://localhost:5000/api/vpn/status
```

---

## 十九、安全考虑

### 19.1 环境变量安全

- **不要**将 .env 文件提交到Git
- 使用 `.env.example` 作为模板
- 生产环境使用环境变量或密匙管理服务

### 19.2 VPN凭证保护

- OpenVPN凭证应该保密
- 定期更换密码
- 使用最小权限原则

### 19.3 HTTPS配置

- 使用Let's Encrypt获取免费SSL证书
- 配置HTTP到HTTPS重定向
- 定期更新证书

---

## 二十、性能优化

### 20.1 前端优化

- 使用生产构建 (`npm run build`)
- 启用Gzip压缩
- 配置缓存策略
- 图片优化

### 20.2 后端优化

- 使用PM2集群模式
- 配置适当的超时
- 实现请求缓存
- 数据库索引优化（如使用真实数据库）

---

## 二十一、故障排查

### 21.1 常见问题

| 问题 | 解决方案 |
|------|----------|
| 端口占用 | `lsof -i:5000` 查找并杀掉进程 |
| CORS错误 | 检查 server.js 中的 CORS 配置 |
| 数据不更新 | 检查 scheduler.js 是否正常运行 |
| 前端无法连接后端 | 检查 proxy 配置和后端服务状态 |

### 21.2 调试命令

```bash
# 查看Node进程
ps aux | grep node

# 查看端口占用
netstat -tlnp | grep 5000

# 查看实时日志
pm2 logs vpnspan-backend

# 测试API
curl http://localhost:5000/api/health
```

---

## 二十二、版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-02-14 | 初始版本，包含5个VPN监控和评测 |

---

## 二十三、贡献与支持

- 问题反馈: https://github.com/zoomview/vpnspan/issues
- 功能建议: 联系开发团队
- 文档纠错: 提交Pull Request

---

*本文档最后更新于 2026年2月14日*
