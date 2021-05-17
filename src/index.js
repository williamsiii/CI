const fs = require('fs');

// BEGIN
function upVersion(path, type = 'patch') {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    const [major, minor, patch] = data.version.split('.').map(Number);
    const doUpVersion = (version) => fs.writeFileSync(
        path,
        JSON.stringify({ ...data, version }),
    );

    switch (type) {
        case 'major': {
            doUpVersion(`${major + 1}.1.0`);
            break;
        }
        case 'minor': {
            doUpVersion(`${major}.${minor + 1}.0`);
            break;
        }
        case 'patch': {
            doUpVersion(`${major}.${minor}.${patch + 1}`);
            break;
        }
        default: {
            throw new Error(`Unknown version type: ${type}`);
        }
    }
}

// END

module.exports = { upVersion };
