// BEGIN FIREFOX FAVICON
// two options for favicon
// either on URL/favicon.ico
// or on <link rel="icon" href="">
import ky from 'ky';
async function firefoxFavIconRequest (domain) {
    //console.log ('requested: ' + parsed.url + ' (' + parsed.status + ')');
    domain = 'https://' + domain;
    let favIconString = '';
    const parsed = await ky ('', {prefixUrl: domain}).text ()
        .then (function (text) {
        let str = text.split ('\n');
        str.forEach (function (item) {
            if (favIconString.length == 0) {
                if (item.indexOf ('favicon') != -1) {
                    item = item.replace (/.*href=\"/, '');
                    item = item.replace (/\">/, '');
                    if (item.replace (/.*[\/]/, '').indexOf ('.png') != -1)
                        favIconString = item;
                }
            }
        });
        if (favIconString == '')
            favIconString = domain + '/favicon.ico';

        if (favIconString.indexOf ('http') == -1)
            favIconString = domain + favIconString;
    });

    return favIconString;
}
// END FIREFOX FAVICON


const iconList = {
    0: '🟢', // green circle
    1: '🟡', // yellow circle
    2: '🔴', // red circle
    3: '🔵'  // blue circle
};

function prettyPrint(iconId, moduleName, ...params) {
    console.info(`[${moduleName}]`, iconList[iconId], ...params);
}

function getDomain(url) {
    try {
        return new URL(url).hostname;
    } catch {
        return '';
    }
}

function preventDrag(e) {
    e.preventDefault();
}

function getFaviconUrlByDomain(domain) {
		return '';

		/*
		if (domain.includes('.')) {
			// use HTTPS by default
			return 'chrome://favicon/size/20@1x/https://' + domain;
		} else {
			// not a usual domain, use chrome:// protocol instead
			return 'chrome://favicon/size/20@1x/chrome://' + domain;
		}
		*/
}

function getFaviconUrlByUrl(url) {
		return '';

    //return 'chrome://favicon/size/20@1x/' + url;
}

// use by popup to display tracker url in a friendly way
function getFriendlyUrl(url) {
    const domain = getDomain(url);
    const filename = url
        .replace(/.*?:\/\/.*?\//, '')   // remove protocol prefix and domain and the / after domain
        .split(/\//)
        .filter(i => i) // ignore empty items
        .slice(-1)[0]  // use the last item
        .replace(/[?#](.*)$/, '');   // remove parameters that starts with ? or #
    return `/${filename || ''} @ ${domain}`;
}

// user allow rule, no protocol prefix, no parameters
function getCustomRule(url) {
    return url
        .replace(/.*?:\/\//, '')
        .replace(/[?#](.*)$/, '');
}

export {
    prettyPrint, getDomain, preventDrag, getFaviconUrlByDomain, getFaviconUrlByUrl, getFriendlyUrl, getCustomRule, firefoxFavIconRequest
};
