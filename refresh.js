const axios = require('axios');

async function fetchSessionCSRFToken(roblosecurityCookie) {
    try {
        // Attempt to get the CSRF token by making a POST request
        const response = await axios.post("https://auth.roblox.com/v2/logout", {}, {
            headers: {
                'Cookie': `.ROBLOSECURITY=${roblosecurityCookie}`
            }
        });

        // CSRF token may be present in the response headers or body (if available)
        return response.headers["x-csrf-token"] || null;
    } catch (error) {
        // Return null if there's an error or the token isn't in the headers
        return null;
    }
}

async function generateAuthTicket(roblosecurityCookie) {
    try {
        const csrfToken = await fetchSessionCSRFToken(roblosecurityCookie);
        if (!csrfToken) {
            throw new Error("CSRF token not found");
        }

        const response = await axios.post("https://auth.roblox.com/v1/authentication-ticket", {}, {
            headers: {
                "x-csrf-token": csrfToken,
                "referer": "https://www.roblox.com/madebySynaptrixBitch",
                'Content-Type': 'application/json',
                'Cookie': `.ROBLOSECURITY=${roblosecurityCookie}`
            }
        });

        // Return the authentication ticket or an error message
        return response.headers['rbx-authentication-ticket'] || "Failed to fetch auth ticket";
    } catch (error) {
        return "Failed to fetch auth ticket";
    }
}

async function redeemAuthTicket(authTicket) {
    try {
        const response = await axios.post("https://auth.roblox.com/v1/authentication-ticket/redeem", {
            "authenticationTicket": authTicket
        }, {
            headers: {
                'RBXAuthenticationNegotiation': '1'
            }
        });

        // Extract the refreshed cookie from the response headers
        const refreshedCookieData = response.headers['set-cookie']?.toString() || "";
        const refreshedCookie = refreshedCookieData.match(/(_\|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.\|_[A-Za-z0-9]+)/g)?.toString() || "";

        return {
            success: true,
            refreshedCookie: refreshedCookie
        };
    } catch (error) {
        return {
            success: false,
            robloxDebugResponse: error.response?.data || "Unknown error"
        };
    }
}

module.exports = {
    generateAuthTicket,
    redeemAuthTicket
};
