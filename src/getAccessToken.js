function getAccessToken() {
    const cookieString = document.cookie;
    const cookieParts = cookieString.split('; ');
    for (let i = 0; i < cookieParts.length; i++) {
        const [key, value] = cookieParts[i].split('=');
        if (key === 'accessToken') {
            return value;
        }
    }
    return null;
}

export { getAccessToken }