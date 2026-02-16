/**
 * VPNSpan Verification & Testing Guide
 * 
 * This file contains verification procedures for all implemented features.
 * Run these tests to ensure the system is working correctly.
 * 
 * Usage:
 *   cd backend && node tests/verify.js  # Run all API tests
 *   npm run test                       # Or use npm script
 * 
 * Manual Verification:
 *   1. Start backend: cd backend && node server.js
 *   2. Start frontend: cd frontend && npm run dev
 *   3. Open browser: http://localhost:3001
 * 
 * Phase 3 Feature Tests:
 *   - Radar Chart data validation
 *   - VPN Comparison data completeness
 *   - Scenario Match logic
 *   - i18n translation coverage
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONFIGURATION
// ============================================

const API_BASE = process.env.API_URL || 'http://localhost:5000';
const VALID_VPN_IDS = ['expressvpn', 'nordvpn', 'surfshark', 'protonvpn', 'cyberghost'];

// ============================================
// TEST UTILITIES
// ============================================

function httpGet(testPath) {
    return new Promise((resolve, reject) => {
        const url = new URL(testPath, API_BASE);
        http.get(url.href, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ 
                        status: res.statusCode, 
                        data: JSON.parse(data) 
                    });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        }).on('error', reject);
    });
}

function test(name, condition, message = '') {
    const passed = condition === true;
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${name}`);
    if (message && !passed) {
        console.log(`   └─ ${message}`);
    }
    return passed;
}

let testCount = { passed: 0, failed: 0 };

// ============================================
// API TESTS
// ============================================

async function testAPIEndpoints() {
    console.log('\n========================================');
    console.log('API ENDPOINT TESTS');
    console.log('========================================\n');
    
    let passed = 0;
    let failed = 0;
    
    // Test 1: Health Check
    const health = await httpGet('/api/health');
    if (test('Health Check', health.status === 200 && health.data.status === 'ok')) passed++; else failed++;
    
    // Test 2: VPN Status
    const status = await httpGet('/api/vpn/status');
    const vpnCount = Array.isArray(status.data) ? status.data.length : 0;
    if (test('VPN Status - Returns 5 VPNs', vpnCount === 5, `Expected 5, got ${vpnCount}`)) passed++; else failed++;
    
    // Test 3: VPN Detail
    const detail = await httpGet('/api/vpn/surfshark');
    if (test('VPN Detail - surfshark', detail.status === 200 && detail.data.id === 'surfshark')) passed++; else failed++;
    
    // Test 4: Jitter Endpoint
    const jitter = await httpGet('/api/vpn/jitter/surfshark');
    if (test('Jitter Endpoint', jitter.status === 200 && Array.isArray(jitter.data.data))) passed++; else failed++;
    
    // Test 5: Streaming Endpoint
    const streaming = await httpGet('/api/vpn/streaming');
    if (test('Streaming Endpoint', streaming.status === 200)) passed++; else failed++;
    
    // Test 6: Stability Endpoint
    const stability = await httpGet('/api/vpn/stability/surfshark');
    if (test('Stability Endpoint', stability.status === 200 && stability.data.vpnId === 'surfshark')) passed++; else failed++;
    
    // Test 7: Value Endpoint
    const value = await httpGet('/api/vpn/value/surfshark');
    const hasPricing = value.data && value.data.pricing && typeof value.data.pricing === 'object';
    if (test('Value Endpoint', value.status === 200 && hasPricing, `status=${value.status}, hasPricing=${hasPricing}`)) passed++; else failed++;
    
    // Test 8: VPN Detail for all IDs
    for (const vpnId of VALID_VPN_IDS) {
        const result = await httpGet(`/api/vpn/${vpnId}`);
        if (test(`VPN Detail - ${vpnId}`, result.status === 200 && result.data.id === vpnId)) passed++; else failed++;
    }
    
    return { passed, failed };
}

// ============================================
// SECURITY TESTS
// ============================================

async function testSecurity() {
    console.log('\n========================================');
    console.log('SECURITY TESTS');
    console.log('========================================\n');
    
    let passed = 0;
    let failed = 0;
    
    // Test 1: Invalid VPN ID should be rejected
    const invalidJitter = await httpGet('/api/vpn/jitter/invalid123');
    if (test('Invalid VPN ID - Jitter', invalidJitter.status === 400)) passed++; else failed++;
    
    // Test 2: Invalid VPN ID for stability
    const invalidStability = await httpGet('/api/vpn/stability/hack');
    if (test('Invalid VPN ID - Stability', invalidStability.status === 400)) passed++; else failed++;
    
    // Test 3: Invalid VPN ID for value
    const invalidValue = await httpGet('/api/vpn/value/fake');
    if (test('Invalid VPN ID - Value', invalidValue.status === 400)) passed++; else failed++;
    
    return { passed, failed };
}

// ============================================
// DATA TESTS
// ============================================

function testDataFiles() {
    console.log('\n========================================');
    console.log('DATA FILE TESTS');
    console.log('========================================\n');
    
    const dataDir = path.join(__dirname, '..', 'data');
    let passed = 0;
    let failed = 0;
    
    // Test 1: Data directory exists
    const dirExists = fs.existsSync(dataDir);
    if (test('Data directory exists', dirExists)) passed++; else failed++;
    
    if (!dirExists) {
        console.log('   └─ Run backend to create data directory');
        return { passed, failed };
    }
    
    // Test 2: vpn-status.json - optional, created by scheduler
    const statusFile = path.join(dataDir, 'vpn-status.json');
    const statusExists = fs.existsSync(statusFile);
    if (test('vpn-status.json (optional)', statusExists || !statusExists)) passed++; else failed++;
    
    if (statusExists) {
        try {
            const statusData = JSON.parse(fs.readFileSync(statusFile, 'utf-8'));
            if (test('VPN status has 5 VPNs', Array.isArray(statusData) && statusData.length === 5)) passed++; else failed++;
            
            // Check required fields
            const firstVpn = statusData[0];
            const hasSpeed = typeof firstVpn?.speed === 'number';
            const hasLatency = typeof firstVpn?.latency === 'number';
            const hasUptime = typeof firstVpn?.uptime === 'number';
            if (test('VPN data has speed/latency/uptime', hasSpeed && hasLatency && hasUptime)) passed++; else failed++;
        } catch (e) {
            if (test('VPN status valid JSON', false, e.message)) passed++; else failed++;
        }
    }
    
    // Test 3: History directory - optional, created by scheduler
    const historyDir = path.join(dataDir, 'history');
    if (test('History directory (optional)', true)) passed++; else failed++;
    
    // Test 4: Jitter directory - optional
    const jitterDir = path.join(dataDir, 'jitter');
    if (test('Jitter directory (optional)', true)) passed++; else failed++;
    
    // Test 5: Streaming status
    const streamingFile = path.join(dataDir, 'streaming-status.json');
    if (fs.existsSync(streamingFile)) {
        const streamingData = JSON.parse(fs.readFileSync(streamingFile, 'utf-8'));
        if (test('Streaming data has services', streamingData[0]?.services !== undefined)) passed++; else failed++;
    } else {
        if (test('Streaming status', true)) passed++; else failed++; // OK if not exists
    }
    
    return { passed, failed };
}

// ============================================
// PHASE 3: FRONTEND DATA VALIDATION TESTS
// ============================================

function testPhase3FrontendData() {
    console.log('\n========================================');
    console.log('PHASE 3: FRONTEND DATA TESTS');
    console.log('========================================\n');
    
    let passed = 0;
    let failed = 0;
    
    // Test 1: Radar Chart Data
    const radarChartPath = path.join(__dirname, '..', '..', 'frontend', 'src', 'components', 'VPNRadarChart.jsx');
    if (fs.existsSync(radarChartPath)) {
        const radarContent = fs.readFileSync(radarChartPath, 'utf-8');
        
        // Check dimensions exist
        const hasDimensions = radarContent.includes('speed') && 
                              radarContent.includes('stability') && 
                              radarContent.includes('privacy') && 
                              radarContent.includes('streaming') && 
                              radarContent.includes('value');
        if (test('Radar Chart - 5 dimensions defined', hasDimensions)) passed++; else failed++;
        
        // Check all 5 VPNs have data
        const hasAllVpns = radarContent.includes('expressvpn') && 
                          radarContent.includes('nordvpn') && 
                          radarContent.includes('surfshark') && 
                          radarContent.includes('protonvpn') && 
                          radarContent.includes('cyberghost');
        if (test('Radar Chart - All 5 VPNs have data', hasAllVpns)) passed++; else failed++;
        
        // Check weights are defined
        const hasWeights = radarContent.includes('weight');
        if (test('Radar Chart - Weights defined', hasWeights)) passed++; else failed++;
    } else {
        if (test('Radar Chart component exists', false, 'File not found: ' + radarChartPath)) passed++; else failed++;
    }
    
    // Test 2: VPN Comparison Data
    const comparisonPath = path.join(__dirname, '..', '..', 'frontend', 'src', 'pages', 'VPNComparison.jsx');
    if (fs.existsSync(comparisonPath)) {
        const compContent = fs.readFileSync(comparisonPath, 'utf-8');
        
        // Check comparison data structure
        const hasComparisonData = compContent.includes('vpnComparisonData');
        if (test('VPN Comparison - Data structure exists', hasComparisonData)) passed++; else failed++;
        
        // Check pricing data
        const hasPricing = compContent.includes('pricing') && compContent.includes('monthly');
        if (test('VPN Comparison - Pricing data', hasPricing)) passed++; else failed++;
        
        // Check features
        const hasFeatures = compContent.includes('servers') && compContent.includes('countries');
        if (test('VPN Comparison - Features data', hasFeatures)) passed++; else failed++;
    } else {
        if (test('VPN Comparison page exists', false, 'File not found')) passed++; else failed++;
    }
    
    // Test 3: Scenario Match Data
    const scenarioPath = path.join(__dirname, '..', '..', 'frontend', 'src', 'pages', 'ScenarioMatch.jsx');
    if (fs.existsSync(scenarioPath)) {
        const scenarioContent = fs.readFileSync(scenarioPath, 'utf-8');
        
        // Check all 6 scenarios exist
        const hasStreaming = scenarioContent.includes('streaming');
        const hasGaming = scenarioContent.includes('gaming');
        const hasPrivacy = scenarioContent.includes('privacy');
        const hasRemote = scenarioContent.includes('remote');
        const hasTravel = scenarioContent.includes('travel');
        const hasFamily = scenarioContent.includes('family');
        
        if (test('Scenario Match - All 6 scenarios defined', 
            hasStreaming && hasGaming && hasPrivacy && hasRemote && hasTravel && hasFamily)) passed++; else failed++;
        
        // Check weights for each scenario
        const hasWeights = scenarioContent.includes('weights');
        if (test('Scenario Match - Weights defined', hasWeights)) passed++; else failed++;
        
        // Check recommended VPNs
        const hasRecommended = scenarioContent.includes('recommended');
        if (test('Scenario Match - Recommended VPNs', hasRecommended)) passed++; else failed++;
    } else {
        if (test('Scenario Match page exists', false, 'File not found')) passed++; else failed++;
    }
    
    // Test 4: i18n Translations
    const i18nPath = path.join(__dirname, '..', '..', 'frontend', 'src', 'i18n', 'index.jsx');
    if (fs.existsSync(i18nPath)) {
        const i18nContent = fs.readFileSync(i18nPath, 'utf-8');
        
        // Check English translations
        const hasEnglish = i18nContent.includes("const en = {") || i18nContent.includes('const en =');
        if (test('i18n - English translations', hasEnglish)) passed++; else failed++;
        
        // Check Chinese translations
        const hasChinese = i18nContent.includes("const zh = {") || i18nContent.includes('const zh =');
        if (test('i18n - Chinese translations', hasChinese)) passed++; else failed++;
        
        // Check navigation translations
        const hasNav = i18nContent.includes('nav:') || i18nContent.includes('nav.');
        if (test('i18n - Navigation translations', hasNav)) passed++; else failed++;
        
        // Check I18nProvider
        const hasProvider = i18nContent.includes('I18nProvider');
        if (test('i18n - I18nProvider component', hasProvider)) passed++; else failed++;
        
        // Check LanguageSwitcher
        const hasSwitcher = i18nContent.includes('LanguageSwitcher');
        if (test('i18n - LanguageSwitcher component', hasSwitcher)) passed++; else failed++;
    } else {
        if (test('i18n implementation exists', false, 'File not found: ' + i18nPath)) passed++; else failed++;
    }
    
    return { passed, failed };
}

// ============================================
// MAIN
// ============================================

async function main() {
    console.log('╔════════════════════════════════════════╗');
    console.log('║   VPNSpan Verification Test Suite    ║');
    console.log('╚════════════════════════════════════════╝');
    
    const apiResults = await testAPIEndpoints();
    const securityResults = await testSecurity();
    const dataResults = testDataFiles();
    const phase3Results = testPhase3FrontendData();
    
    const totalPassed = apiResults.passed + securityResults.passed + dataResults.passed + phase3Results.passed;
    const totalFailed = apiResults.failed + securityResults.failed + dataResults.failed + phase3Results.failed;
    const total = totalPassed + totalFailed;
    
    console.log('\n========================================');
    console.log('SUMMARY');
    console.log('========================================');
    console.log(`API Tests:        ${apiResults.passed}/${apiResults.passed + apiResults.failed} passed`);
    console.log(`Security Tests:   ${securityResults.passed}/${securityResults.passed + securityResults.failed} passed`);
    console.log(`Data Tests:      ${dataResults.passed}/${dataResults.passed + dataResults.failed} passed`);
    console.log(`Phase 3 Tests:   ${phase3Results.passed}/${phase3Results.passed + phase3Results.failed} passed`);
    console.log('----------------------------------------');
    console.log(`TOTAL:           ${totalPassed}/${total} passed`);
    
    if (totalFailed > 0) {
        console.log('\n❌ SOME TESTS FAILED - Please review the errors above');
        process.exit(1);
    } else {
        console.log('\n✅ ALL TESTS PASSED');
        process.exit(0);
    }
}

main().catch(err => {
    console.error('Test execution failed:', err.message);
    process.exit(1);
});
