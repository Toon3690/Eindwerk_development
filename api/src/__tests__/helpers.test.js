const Helpers = require('../utils/helpers');

describe('uuid validator test', () => {
    test('test if it is a string and test if string is not empty', () => {
        expect(Helpers.validateUUID("54321")).toBeTruthy();
        expect(Helpers.validateUUID("")).toBeFalsy();
    });
    test('test if an empty string', () => {
        expect(Helpers.validateUUID("54321")).toBeTruthy();
        expect(Helpers.validateUUID("")).toBeFalsy();
    });
});

describe('xWaarde test', () => {
    test('test if xWaarde is valid', () => {
        expect(Helpers.checkX(628)).toBeTruthy();
        expect(Helpers.checkX(642)).toBeFalsy();
        expect(Helpers.checkX("5a")).toBeFalsy();
    })
});