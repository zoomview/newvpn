/**
 * VPNSpan Frontend Feature Tests (Phase 3)
 * 
 * This file tests the UI features:
 * - Radar Chart visualization
 * - VPN Comparison page
 * - Scenario Match page
 * - i18n language switching
 * - Mobile responsiveness
 * 
 * Usage:
 *   node tests/frontend-test.js
 * 
 * Prerequisites:
 *   1. Start backend: cd backend && node server.js
 *   2. Start frontend: cd frontend && npm run dev
 *   3. Frontend should be running on http://localhost:5173 (Vite default)
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const API_URL = process.env.API_URL || 'http://localhost:5000';

let passed = 0;
let failed = 0;

function test(name, condition, message = '') {
    const result = condition === true;
    const status = result ? '✅' : '❌';
    console.log(`${status} ${name}`);
    if (message && !result) {
        console.log(`   └─ ${message}`);
    }
    if (result) passed++;
    else failed++;
    return result;
}

async function httpGet(url) {
    const https = await import('http');
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        }).on('error', reject);
    });
}

async function testFrontend() {
    console.log('\n========================================');
    console.log('FRONTEND UI TESTS');
    console.log('========================================\n');

    let browser;
    try {
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 }
        });
        const page = await context.newPage();

        // Collect console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        // Test 1: Dashboard loads without errors
        console.log('--- Dashboard Tests ---');
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        const dashboardTitle = await page.title();
        test('Dashboard page loads', dashboardTitle.length > 0);
        
        const noConsoleErrors = consoleErrors.length === 0;
        test('Dashboard - No console errors', noConsoleErrors, 
            noConsoleErrors ? '' : `Found ${consoleErrors.length} errors: ${consoleErrors.slice(0, 3).join(', ')}`);

        // Test 2: VPN Comparison page
        console.log('\n--- VPN Comparison Tests ---');
        await page.goto(`${BASE_URL}/comparison`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);
        
        const comparisonTitle = await page.locator('h1').first().textContent().catch(() => '');
        test('Comparison page loads', comparisonTitle.includes('Compare') || comparisonTitle.includes('对比'));
        
        // Check for VPN checkboxes
        const checkboxes = await page.locator('input[type="checkbox"]').count();
        test('Comparison - Has VPN selection checkboxes', checkboxes >= 2, `Found ${checkboxes} checkboxes`);

        // Test 3: Scenario Match page
        console.log('\n--- Scenario Match Tests ---');
        await page.goto(`${BASE_URL}/find-vpn`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);
        
        const scenarioTitle = await page.locator('h1').first().textContent().catch(() => '');
        test('Scenario Match page loads', scenarioTitle.includes('Find') || scenarioTitle.includes('找') || scenarioTitle.includes('VPN'));
        
        // Check for scenario cards
        const scenarioCards = await page.locator('[class*="card"], [class*="scenario"], button').count();
        test('Scenario Match - Has scenario options', scenarioCards >= 3, `Found ${scenarioCards} options`);

        // Test 4: i18n Language Switcher
        console.log('\n--- i18n Tests ---');
        
        // Check if language switcher exists in header
        const langSwitcher = await page.locator('select').first();
        const hasLangSwitcher = await langSwitcher.count() > 0;
        test('i18n - Language switcher exists', hasLangSwitcher);
        
        if (hasLangSwitcher) {
            // Try switching to Chinese
            await langSwitcher.selectOption('zh');
            await page.waitForTimeout(500);
            
            // Check if navigation changed
            const navText = await page.locator('nav').first().textContent();
            const hasChinese = navText.includes('仪表盘') || navText.includes('对比') || navText.includes('博客');
            test('i18n - Chinese translation works', hasChinese, `Nav text: ${navText.slice(0, 50)}`);
            
            // Switch back to English
            await langSwitcher.selectOption('en');
            await page.waitForTimeout(500);
        }

        // Test 5: Mobile Responsiveness
        console.log('\n--- Mobile Tests ---');
        
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 812 });
        await page.waitForTimeout(500);
        
        // Check if mobile menu button exists
        const mobileMenuBtn = await page.locator('button[aria-label="Toggle menu"], .menu-toggle').count();
        test('Mobile - Menu toggle button exists', mobileMenuBtn > 0, `Found ${mobileMenuBtn} menu buttons`);
        
        // Reset to desktop
        await page.setViewportSize({ width: 1280, height: 720 });
        
        // Test 6: VPN Review pages
        console.log('\n--- VPN Review Tests ---');
        await page.goto(`${BASE_URL}/reviews/surfshark`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);
        
        const reviewPageLoaded = await page.locator('h1').first().textContent().catch(() => '');
        test('VPN Review page loads', reviewPageLoaded.includes('Surfshark'));
        
        // Check for affiliate link button
        const affiliateBtn = await page.locator('a[href*="surfshark"], button:has-text("Get"), button:has-text("优惠")').count();
        test('VPN Review - Has affiliate CTA', affiliateBtn > 0);

        // Test 7: API Connectivity
        console.log('\n--- API Connectivity Tests ---');
        const apiStatus = await httpGet(`${API_URL}/api/health`);
        test('API - Backend is running', apiStatus.status === 200);
        
        const vpnStatus = await httpGet(`${API_URL}/api/vpn/status`);
        test('API - VPN status endpoint', vpnStatus.status === 200 && vpnStatus.data.length === 5);

        await context.close();
        await browser.close();

    } catch (error) {
        console.log(`\n❌ Frontend test error: ${error.message}`);
        if (browser) await browser.close();
        failed++;
    }

    return { passed, failed };
}

async function main() {
    console.log('╔════════════════════════════════════════╗');
    console.log('║  VPNSpan Frontend Feature Tests      ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`\nTesting: ${BASE_URL}`);
    console.log(`API: ${API_URL}`);

    // First check if frontend is running
    try {
        await httpGet(BASE_URL);
    } catch (e) {
        console.log('\n⚠️  Frontend not running. Starting test anyway...\n');
        console.log('To run full tests:');
        console.log('  1. Terminal 1: cd backend && node server.js');
        console.log('  2. Terminal 2: cd frontend && npm run dev');
        console.log('  3. Terminal 3: node tests/frontend-test.js\n');
    }

    const results = await testFrontend();

    console.log('\n========================================');
    console.log('SUMMARY');
    console.log('========================================');
    console.log(`Frontend Tests: ${results.passed}/${results.passed + results.failed} passed`);
    console.log('----------------------------------------');

    if (results.failed > 0) {
        console.log('\n❌ SOME TESTS FAILED');
        process.exit(1);
    } else {
        console.log('\n✅ ALL FRONTEND TESTS PASSED');
        process.exit(0);
    }
}

main().catch(err => {
    console.error('Test execution failed:', err.message);
    process.exit(1);
});
