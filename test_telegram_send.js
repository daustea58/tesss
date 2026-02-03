// Test script untuk kirim data ke Telegram
const https = require('https');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BOT_TOKEN = '8258321413:AAGxz3BA1tZkJdLt6hYP1G4ILCBhf_Ftn_g';
const CHAT_ID = '7336362623';

// Test 1: Kirim text message
async function sendTextMessage() {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            chat_id: CHAT_ID,
            text: '🧪 Test dari script: Foto dan Maps sedang dikirim...'
        });

        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${BOT_TOKEN}/sendMessage`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log('✅ Text message sent:', JSON.parse(data).ok);
                resolve(data);
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// Test 2: Kirim lokasi (maps)
async function sendLocation() {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            chat_id: CHAT_ID,
            latitude: -6.2088,
            longitude: 106.8456,
            horizontal_accuracy: 10
        });

        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${BOT_TOKEN}/sendLocation`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log('✅ Location sent:', JSON.parse(data).ok);
                resolve(data);
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// Test 3: Kirim foto
async function sendPhoto() {
    return new Promise((resolve, reject) => {
        // Create dummy image buffer (1x1 pixel PNG)
        const dummyImage = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            'base64'
        );

        const form = new FormData();
        form.append('chat_id', CHAT_ID);
        form.append('photo', dummyImage, {
            filename: 'test_photo.png',
            contentType: 'image/png'
        });
        form.append('caption', '📸 Test Photo dari script');

        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${BOT_TOKEN}/sendPhoto`,
            method: 'POST',
            headers: form.getHeaders()
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log('✅ Photo sent:', JSON.parse(data).ok);
                resolve(data);
            });
        });

        req.on('error', reject);
        form.pipe(req);
    });
}

// Test 4: Kirim document (ZIP)
async function sendDocument() {
    return new Promise((resolve, reject) => {
        // Create dummy zip content
        const dummyZip = Buffer.from('UEsDBAoAAAAAAOJeF1kAAAAAAAAAAAAAAAAJABwAdGVzdC50eHRVVAkAA+JeF1niXhdZdXgLAAEE6AMAAAToAwAAUEsBAh4DCgAAAAAA4l4XWQAAAAAAAAAAAAAAAAkAGAAAAAAAAAAAAKSBAAAAAHRlc3QudHh0VVQFAAPiXhdZdXgLAAEE6AMAAAToAwAAUEsFBgAAAAABAAEATwAAAEMAAAAAAA==', 'base64');

        const form = new FormData();
        form.append('chat_id', CHAT_ID);
        form.append('document', dummyZip, {
            filename: 'test_data.zip',
            contentType: 'application/zip'
        });
        form.append('caption', '📦 Test ZIP dari script\n\n✅ Berisi: test.txt');

        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${BOT_TOKEN}/sendDocument`,
            method: 'POST',
            headers: form.getHeaders()
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log('✅ Document sent:', JSON.parse(data).ok);
                resolve(data);
            });
        });

        req.on('error', reject);
        form.pipe(req);
    });
}

// Run all tests
async function runTests() {
    console.log('🧪 Starting Telegram tests...\n');
    
    try {
        console.log('1️⃣ Sending text message...');
        await sendTextMessage();
        
        await new Promise(r => setTimeout(r, 1000));
        
        console.log('\n2️⃣ Sending location (maps)...');
        await sendLocation();
        
        await new Promise(r => setTimeout(r, 1000));
        
        console.log('\n3️⃣ Sending photo...');
        await sendPhoto();
        
        await new Promise(r => setTimeout(r, 1000));
        
        console.log('\n4️⃣ Sending document (ZIP)...');
        await sendDocument();
        
        console.log('\n\n🎉 All tests completed! Check your Telegram!');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

runTests();
