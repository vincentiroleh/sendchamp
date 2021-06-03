const request = require('request');

require('dotenv').config();

const ACCESS_KEY = process.env.SENDCHAMP_ACCESS_KEY;
const SECRET_KEY = process.env.SENDCHAMP_SECRET_KEY;


const sendSms = async (data) => {
    try {
        const options = {
            'method': 'POST',
            'url': 'https://sandbox-api.sendchamp.com/api/v1/sms/send',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Bearer ${ACCESS_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    } catch (error) {
        return console.error(error)
    }
}


module.exports = sendSms;