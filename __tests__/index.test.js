const fs = require('fs');
const path = require('path');
const { upVersion } = require('../src/index.js');

const fixtureName = 'package.json'
const parseFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const testFilePath = path.resolve(__dirname, `../__fixtures__/${fixtureName}`);

// BEGIN
describe('upVersion test', () => {
    const originalData = parseFile(testFilePath);
    let initialContent;

    beforeAll(() => {
        initialContent = fs.readFileSync(testFilePath)
    })

    afterEach(() => {
        fs.writeFileSync(testFilePath, initialContent)
    })

    it('upVersion patch', () => {
        upVersion(testFilePath);
        const data = parseFile(testFilePath);

        expect(data.version).toEqual('1.2.3');
    });

    it('upVersion patch, with param', () => {
        upVersion(testFilePath, 'patch');
        const data = parseFile(testFilePath);

        expect(data.version).toEqual('1.2.3');
    });

    it('upVersion minor', () => {
        upVersion(testFilePath, 'minor');
        const data = parseFile(testFilePath);

        expect(data.version).toEqual('1.3.0');
    });

    it('upVersion major', () => {
        upVersion(testFilePath, 'major');
        const data = parseFile(testFilePath);

        expect(data.version).toEqual('2.0.0');
    });

    it('nothing broken', () => {
        upVersion(testFilePath, 'major');
        upVersion(testFilePath, 'minor');
        upVersion(testFilePath);
        const data = parseFile(testFilePath);
        delete originalData.version;

        expect(data).toMatchObject(originalData)
    })

})
// END
