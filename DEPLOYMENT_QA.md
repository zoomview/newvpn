# 部署问题QA - 经验教训总结

> 本文档记录了部署过程中犯过的低级错误和经验教训

---

## 核心教训：五个低级错误

| # | 错误类型 | 问题描述 | 后果 |
|---|---------|---------|------|
| 1 | **路径错误** | 给了 `cp dist/index.html ../` 而不是 `./` | 文件复制到错误位置，Nginx找不到 |
| 2 | **未理解根本原因** | 没意识到index.html有两个版本（开发版/生产版） | 反复在同一个问题上犯错 |
| 3 | **步骤遗漏** | 每次给命令时不够清晰明确 | 用户不知道哪些必须做 |
| 4 | **假设用户理解** | 没有解释为什么要做某些步骤 | 用户执行错误也不知道 |
| 5 | **分步给命令** | 依赖安装一个一个给，反馈缺一个再给下一个 | 效率极低，服务器要反复等待 |

### 教训总结

1. **不要分步给出命令** - 要一次性给出完整流程
2. **明确路径** - 始终使用 `./` 而非 `../`
3. **先构建再复制** - npm run build 必须先执行
4. **删除旧文件再复制** - 避免旧文件残留
5. **验证再交付** - 给完命令后要确认执行结果
6. **一次性安装所有依赖** - 不要让用户反复等待

---

## 问题1: 页面白屏 / 无法加载

### 症状
- 浏览器显示白屏
- 控制台报错: `Failed to load module script: Expected a JavaScript module...`
- 报错指向 `/src/main.jsx`

### 根本原因
index.html 有两个版本：
| 版本 | 引用 | 用途 |
|------|------|------|
| 开发版 | `<script src="/src/main.jsx">` | 本地开发 |
| 生产版 | `<script src="/assets/index-xxx.js">` | 线上部署 |

**仓库里index.html是开发版本**，构建后会生成正确的生产版本。

### 错误做法
```bash
# ❌ 错误1: 复制到上级目录
cp dist/index.html ../   # 文件到了 /var/www/vpnspan/

# ❌ 错误2: 使用git checkout恢复index.html
git checkout index.html  # 恢复开发版本

# ❌ 错误3: 跳过构建
# 直接复制dist文件，但没有npm run build
```

### 正确做法
```bash
cd /var/www/vpnspan/frontend

# 1. 构建（必须）
npm run build

# 2. 删除旧文件（必须）
rm -f index.html
rm -rf assets

# 3. 复制到当前目录（注意是./不是../）
cp dist/index.html ./
cp -r dist/assets ./

# 4. 重启
systemctl restart nginx
```

---

## 问题2: 部署命令缺少依赖

### 症状
- 执行npm命令提示: `Command 'npm' not found`
- 执行pm2命令提示: `Command 'pm2' not found`
- 执行certbot命令提示: `Command 'certbot' not found`

### 根本原因
服务器没有安装必要的软件

### 正确做法
**一次性安装所有依赖：**

```bash
# 更新系统
apt update && apt upgrade -y

# 安装Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 安装PM2
npm install -g pm2

# 安装Nginx和Certbot
apt install -y nginx certbot python3-certbot-nginx

# 验证
node -v
npm -v
pm2 -v
nginx -v
certbot --version
```

---

## 问题3: 混淆路径概念

### 症状
- 文件复制到错误位置
- Nginx找不到index.html
- 404错误

### 常见路径错误
| 命令 | 目的地 | 说明 |
|------|--------|------|
| `cp dist/index.html ../` | /var/www/vpnspan/ | ❌ 错误 |
| `cp dist/index.html ./` | /var/www/vpnspan/frontend/ | ✅ 正确 |
| `cp dist/index.html .` | /var/www/vpnspan/frontend/ | ✅ 正确 |

**提示：** `../`是上级目录，`./`是当前目录

---

## 问题4: Nginx配置导致的500错误

### 症状
- 500 Internal Server Error
- 错误日志: `rewrite or internal redirection cycle`

### 原因
try_files配置错误

### 正确配置
```nginx
location / {
    try_files $uri /index.html;  # 不要用 $uri/ 会导致循环
}
```

---

## 完整部署流程（永远使用）

### 首次部署（从零开始）

```bash
# 1. 安装所有依赖
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
npm install -g pm2
apt install -y nginx certbot python3-certbot-nginx

# 2. 克隆项目
cd /var/www
git clone https://github.com/zoomview/newvpn.git

# 3. 部署后端
cd /var/www/vpnspan/backend
npm install
pm2 start server.js --name vpnspan-backend
pm2 save

# 4. 部署前端（见下方）

# 5. 配置SSL
certbot --nginx -d vpnspan.com -d www.vpnspan.com --non-interactive --agree-tos --email admin@vpnspan.com
```

### 更新部署

```bash
# 拉取代码
cd /var/www/vpnspan
git pull

# 重新构建前端
cd frontend
npm run build
rm -f index.html
rm -rf assets
cp dist/index.html ./
cp -r dist/assets ./

# 重启服务
pm2 restart vpnspan-backend
systemctl restart nginx
```

---

## 快速诊断命令

```bash
# 检查前端文件是否正确
cat /var/www/vpnspan/frontend/index.html | grep main.jsx
# 应该显示: <script type="module" src="/assets/index-xxx.js">

# 检查Nginx状态
systemctl status nginx

# 检查后端状态
pm2 status

# 查看Nginx错误日志
tail -20 /var/log/nginx/error.log
```

---

*Last Updated: 2026-02-18*
