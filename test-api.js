#!/usr/bin/env node

console.log('🧪 Testing API Connectivity...\n');

// Test localhost server
async function testAPI() {
    const API_BASE = 'http://localhost:8000';
    
    console.log('🔍 Testing API endpoints:');
    
    const endpoints = [
        { url: `${API_BASE}/`, name: 'Root Endpoint' },
        { url: `${API_BASE}/debug`, name: 'Debug Endpoint' }
    ];
    
    for (const endpoint of endpoints) {
        try {
            console.log(`\n📡 Testing ${endpoint.name}: ${endpoint.url}`);
            
            const response = await fetch(endpoint.url);
            const data = await response.json();
            
            console.log(`✅ Status: ${response.status} ${response.statusText}`);
            console.log(`📄 Response: ${JSON.stringify(data, null, 2)}`);
            
        } catch (error) {
            console.log(`❌ Error testing ${endpoint.name}: ${error.message}`);
        }
    }
    
    console.log('\n🎯 API Test Complete!\n');
}

// Run if Node.js is available
if (typeof fetch !== 'undefined' || typeof require !== 'undefined') {
    // Try to use node-fetch if available
    try {
        if (typeof fetch === 'undefined') {
            const { default: fetch } = await import('node-fetch');
            globalThis.fetch = fetch;
        }
        await testAPI();
    } catch (error) {
        console.log('❌ Could not run test. Please install node-fetch or use a modern Node.js version.');
        console.log('   npm install node-fetch');
        console.log('\nAlternatively, test manually:');
        console.log('   curl http://localhost:8000/');
        console.log('   curl http://localhost:8000/debug');
    }
} else {
    console.log('❌ This script requires Node.js with fetch support.');
    console.log('Test manually with:');
    console.log('   curl http://localhost:8000/');
    console.log('   curl http://localhost:8000/debug');
}
