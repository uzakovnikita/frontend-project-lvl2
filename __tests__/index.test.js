import genDiff from '../src/';
test('gendiff', () => {
    const firstConfig = '__tests__/fixtures/before.JSON';
    const secondConfig = '__tests__/fixtures/after.JSON';
    const equal = `{
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      + verbose: true
      - follow: false 
    }`;
    expect(genDiff(firstConfig, secondConfig)).toEqual(equal);
})