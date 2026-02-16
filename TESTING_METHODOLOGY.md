# VPNSpan Testing Methodology v1.0

> Document Version: 1.0 | Last Updated: 2026-02-16

---

## 1. Overview

This document outlines the testing methodology used by VPNSpan to measure and evaluate VPN performance. Our goal is to provide accurate, objective, and reproducible test results that help users make informed decisions.

### Core Principles

- **Independence**: All VPNs are self-purchased. We do not accept sponsored reviews.
- **Transparency**: Test methods are documented and reproducible.
- **Objectivity**: Results are based on measurable metrics, not subjective opinions.

---

## 2. Test Environment

### 2.1 Hardware & Network

| Component | Specification |
|-----------|---------------|
| Server | 2-core Linux VPS |
| Location | Asia-Pacific region |
| Base Bandwidth | 100 Mbps |
| Operating System | Ubuntu 22.04 LTS |

### 2.2 Test Schedule

| Test Type | Frequency | Time (UTC) |
|-----------|-----------|------------|
| Speed Test | Every 30 minutes | Continuous |
| Jitter Test | Daily | 3:00 AM |
| Streaming Test | Twice daily | 8:00 AM, 8:00 PM |

---

## 3. Test Metrics

### 3.1 Speed Metrics

| Metric | Description | Measurement Method |
|--------|-------------|-------------------|
| Download Speed | Mbps | speedtest-cli |
| Upload Speed | Mbps | speedtest-cli |
| Latency | ms | Ping (average of 3) |

### 3.2 Stability Metrics

| Metric | Description | Measurement Method |
|--------|-------------|-------------------|
| Jitter | ms (std deviation) | 120 pings over 10 min |
| P99 Latency | ms | 99th percentile |
| Success Rate | % | Ping success / total pings |

### 3.3 Streaming Support

| Service | Test Method |
|---------|-------------|
| Netflix | Connectivity check |
| YouTube | Connectivity check |
| Disney+ | Connectivity check |
| Hulu | Connectivity check |
| BBC iPlayer | Connectivity check |

---

## 4. Test Methods

### 4.1 Speed Test

```
Protocol: OpenVPN/WireGuard
Test Tool: speedtest-cli
Duration: ~30 seconds per test
Result: Download/Upload Mbps, Latency ms
```

**Process:**
1. Connect to VPN server
2. Run speedtest-cli in simple mode
3. Parse output for download, upload, latency
4. Disconnect and record results

### 4.2 Jitter Test

```
Protocol: ICMP Ping
Interval: Every 5 seconds
Duration: 10 minutes (120 data points)
Target: Public DNS servers
```

**Process:**
1. Connect to VPN server
2. Ping target every 5 seconds for 10 minutes
3. Calculate: min, max, avg, stdDev, P99
4. Calculate success rate
5. Generate stability score

**Stability Score Calculation:**
```
Base Score = 100
- (stdDev - 10) × 2  (if stdDev > 10ms)
- (99 - successRate) × 5  (if successRate < 99%)
Final Score = max(0, min(100, calculated))
```

### 4.3 Streaming Test

```
Method: HTTPS connectivity check
Services: Netflix, YouTube, Disney+, Hulu, BBC
Timeout: 15 seconds
```

**Note:** This tests connectivity, not actual content unblocking. Streaming capabilities are based on known VPN server capabilities.

---

## 5. Data Processing

### 5.1 Data Storage

- **Raw Data**: JSON files per VPN per day
- **Aggregation**: Daily averages, min/max, standard deviation
- **Retention**: 7 days rolling window

### 5.2 Data Structure

```json
{
  "vpnId": "surfshark",
  "timestamp": "2026-02-16T03:00:00Z",
  "download": 85,
  "upload": 35,
  "latency": 28,
  "jitter": 4.2,
  "p99": 42,
  "successRate": 98.5,
  "streaming": {
    "netflix": true,
    "youtube": true,
    "disney": true
  }
}
```

---

## 6. Scoring System

### 6.1 Overall Rating

| Category | Weight |
|----------|--------|
| Speed | 30% |
| Stability | 25% |
| Privacy/Security | 20% |
| Streaming | 15% |
| Value | 10% |

### 6.2 Stability Levels

| Score | Level | Description |
|-------|-------|-------------|
| 80-100 | Excellent | Ideal for gaming, video calls |
| 60-79 | Good | Suitable for most activities |
| 40-59 | Fair | Consider server switch |
| 0-39 | Poor | Try different VPN/protocol |

---

## 7. Limitations

### 7.1 Known Limitations

1. **Location Bias**: Tests run from single geographic location. Results may vary based on user location.
2. **Time Variability**: Network conditions fluctuate. Historical data shows daily/weekly patterns.
3. **Mock Data**: Some VPNs use simulated data due to resource constraints.
4. **Streaming**: Basic connectivity tests; actual unblocking may vary.

### 7.2 What We Don't Test

- Long-term reliability (>7 days)
- Customer support response times
- Mobile app performance
- Specific server performance (only sampled)

---

## 8. Updates

This methodology will be updated as we improve our testing capabilities.

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-16 | Initial release |

---

## 9. Contact

For questions about our testing methodology:
- Email: contact@vpnspan.com
- Website: https://vpnspan.com
