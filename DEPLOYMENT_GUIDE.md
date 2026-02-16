# VPNSpan DigitalOcean Deployment Guide

> Document Version: 1.0
> Created: 2026-02-16
> Server: DigitalOcean 1CPU / 1GB RAM / 25GB SSD
> OS: Ubuntu 22.04

---

## Prerequisites

- DigitalOcean account with droplets access
- Domain: vpnspan.com (configured with A records)
- SSH access to server
- Local project files

---

## Step 1: Server Initial Setup

### 1.1 Connect to Server

```bash
ssh root@your_droplet_ip
```

### 1.2 Update System

```bash
apt update && apt upgrade -y
```

### 1.3 Create Deployment User (Recommended)

```bash
# Create user
adduser deploy

# Add to sudo group
usermod -aG sudo deploy

# Switch to deploy user
su - deploy
```

---

## Step 2: Install Dependencies

### 2.1 Install Node.js 18.x

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verify installation
node -v
npm -v
```

### 2.2 Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 startup script
pm2 startup
```

### 2.3 Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Check status
sudo systemctl status nginx
```

### 2.4 Install Certbot (SSL)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Verify
certbot --version
```

---

## Step 3: Deploy Backend

### 3.1 Create Directory Structure

```bash
sudo mkdir -p /var/www/vpnspan/backend
sudo mkdir -p /var/www/vpnspan/frontend
sudo mkdir -p /var/log/pm2

# Set ownership
sudo chown -R $USER:$USER /var/www/vpnspan
```

### 3.2 Upload Backend Files

**Option A: Using Git (Recommended)**

```bash
# Install git if not present
sudo apt install -y git

# Clone repository
cd /var/www/vpnspan
git clone https://github.com/your-repo/vpnspan.git .

# Or copy files manually via SFTP
```

**Option B: Using SCP**

```bash
# From your local machine
scp -r ./backend/* root@your_droplet_ip:/var/www/vpnspan/backend/
```

### 3.3 Install Backend Dependencies

```bash
cd /var/www/vpnspan/backend
npm install --production
```

### 3.4 Configure Environment Variables

```bash
# Create .env file
nano /var/www/vpnspan/backend/.env
```

Add:
```env
NODE_ENV=production
PORT=5000
```

### 3.5 Start Backend with PM2

```bash
cd /var/www/vpnspan/backend
pm2 start server.js --name vpnspan-backend

# Save PM2 process list
pm2 save

# Setup startup script
pm2 startup
```

### 3.6 Verify Backend

```bash
# Check status
pm2 status

# Test API
curl http://localhost:5000/api/vpn
```

---

## Step 4: Deploy Frontend

### 4.1 Build Frontend Locally

```bash
# On your local machine
cd frontend
npm install
npm run build
```

### 4.2 Upload Frontend Files

```bash
# From your local machine
scp -r ./frontend/dist/* root@your_droplet_ip:/var/www/vpnspan/frontend/
```

Or use SFTP client.

---

## Step 5: Configure Nginx

### 5.1 Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/vpnspan
```

Add configuration:

```nginx
server {
    listen 80;
    server_name vpnspan.com www.vpnspan.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend static files
    location / {
        root /var/www/vpnspan/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API proxy to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
```

### 5.2 Enable Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/vpnspan /etc/nginx/sites-enabled/

# Remove default config
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Step 6: Configure SSL (HTTPS)

### 6.1 Get SSL Certificate

```bash
sudo certbot --nginx -d vpnspan.com -d www.vpnspan.com --non-interactive --agree-tos --email admin@vpnspan.com
```

### 6.2 Verify SSL

```bash
# Test HTTPS
curl -I https://vpnspan.com
```

### 6.3 Auto-Renewal

```bash
# Certbot auto-renews by default. Verify:
sudo certbot renew --dry-run
```

---

## Step 7: Verify Deployment

### 7.1 Check All Services

```bash
# Backend
pm2 status

# Nginx
sudo systemctl status nginx

# Test full flow
curl -I https://vpnspan.com
curl -I https://vpnspan.com/api/vpn
```

### 7.2 Browser Test

Visit:
- https://vpnspan.com - Homepage
- https://vpnspan.com/comparison - Comparison page
- https://vpnspan.com/api/vpn - API endpoint

---

## Step 8: Maintenance Commands

### Restart Services

```bash
# Restart backend
pm2 restart vpnspan-backend

# Restart nginx
sudo systemctl restart nginx
```

### View Logs

```bash
# Backend logs
pm2 logs vpnspan-backend

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Update Deployment

```bash
# Pull latest code
cd /var/www/vpnpn
git pull

# Rebuild frontend locally, upload
# Then restart
pm2 restart vpnspan-backend

# Restart nginx
sudo systemctl restart nginx
```

---

## Troubleshooting

### Backend Won't Start

```bash
# Check logs
pm2 logs vpnspan-backend

# Common issues:
# - Port already in use: lsof -i :5000
# - Missing dependencies: cd /var/www/vpnspan/backend && npm install
```

### Nginx 502 Error

```bash
# Check if backend is running
pm2 status

# Check nginx error logs
sudo tail -20 /var/log/nginx/error.log
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew manually if needed
sudo certbot renew
```

---

## Security Recommendations

1. **Configure Firewall**
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

2. **Disable Root Login** (Optional)
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   ```

3. **Keep Software Updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

## Quick Reference

| Action | Command |
|--------|---------|
| Restart backend | `pm2 restart vpnspan-backend` |
| View logs | `pm2 logs vpnspan-backend` |
| Restart nginx | `sudo systemctl restart nginx` |
| Check status | `pm2 status && sudo systemctl status nginx` |
| Update code | `git pull && pm2 restart vpnspan-backend` |

---

*End of Deployment Guide*
