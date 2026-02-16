#!/bin/bash

# VPNSpan Deployment Script for DigitalOcean
# Usage: ./deploy.sh [production|restart|logs]

set -e

PROJECT_NAME="vpnspan"
PROJECT_DIR="/var/www/$PROJECT_NAME"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root (use sudo)"
    exit 1
fi

install_dependencies() {
    log_info "Installing system dependencies..."
    
    # Update system
    apt update && apt upgrade -y
    
    # Install Node.js 18.x
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
    
    # Install PM2
    npm install -g pm2
    
    # Install Nginx
    apt install -y nginx
    
    # Install Certbot
    apt install -y certbot python3-certbot-nginx
    
    log_info "Dependencies installed successfully"
}

setup_directory() {
    log_info "Setting up project directory..."
    
    mkdir -p $PROJECT_DIR
    mkdir -p /var/log/pm2
    
    # Create frontend directory
    mkdir -p $FRONTEND_DIR
}

deploy_frontend() {
    log_info "Building and deploying frontend..."
    
    # Copy frontend build files (assuming already built locally)
    # In production, you would build locally and upload
    if [ -d "../frontend/dist" ]; then
        cp -r ../frontend/dist/* $FRONTEND_DIR/
        log_info "Frontend deployed successfully"
    else
        log_warn "Frontend build not found. Building..."
        cd ../frontend
        npm install
        npm run build
        cp -r dist/* $FRONTEND_DIR/
        cd -
        log_info "Frontend built and deployed"
    fi
}

deploy_backend() {
    log_info "Deploying backend..."
    
    # Copy backend files
    cp -r ../backend/* $BACKEND_DIR/
    
    # Install backend dependencies
    cd $BACKEND_DIR
    npm install --production
    
    # Setup PM2
    pm2 stop $PROJECT_NAME-backend 2>/dev/null || true
    pm2 delete $PROJECT_NAME-backend 2>/dev/null || true
    pm2 start ecosystem.config.js || pm2 start server.js --name $PROJECT_NAME-backend
    pm2 save
    
    log_info "Backend deployed successfully"
}

configure_nginx() {
    log_info "Configuring Nginx..."
    
    # Copy nginx config
    cp deploy/nginx/vpnspan.conf /etc/nginx/sites-available/$PROJECT_NAME
    
    # Enable site
    ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
    
    # Test nginx config
    nginx -t
    
    # Restart nginx
    systemctl restart nginx
    
    log_info "Nginx configured successfully"
}

setup_ssl() {
    log_info "Setting up SSL with Certbot..."
    
    # Get SSL certificate
    certbot --nginx -d vpnspan.com -d www.vpnspan.com --non-interactive --agree-tos --email admin@vpnspan.com
    
    # Setup auto-renewal
    crontab -l | { cat; echo "0 0 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'"; } | crontab -
    
    log_info "SSL configured successfully"
}

case "${1:-install}" in
    install)
        log_info "Starting full installation..."
        install_dependencies
        setup_directory
        deploy_frontend
        deploy_backend
        configure_nginx
        log_info "Installation complete!"
        ;;
    restart)
        log_info "Restarting services..."
        pm2 restart $PROJECT_NAME-backend
        systemctl restart nginx
        log_info "Services restarted"
        ;;
    logs)
        pm2 logs $PROJECT_NAME-backend
        ;;
    status)
        pm2 status
        ;;
    deploy)
        log_info "Deploying new version..."
        deploy_frontend
        deploy_backend
        log_info "Deployment complete"
        ;;
    ssl)
        setup_ssl
        ;;
    *)
        echo "Usage: $0 {install|restart|logs|status|deploy|ssl}"
        exit 1
        ;;
esac
