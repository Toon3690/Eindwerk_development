const Helpers = require('../utils/helpers');
const uuid = Helpers.generateUUID();

describe('uuid validator test', () => {
    test('test if it is a string and test if string is not empty', () => {
        console.log(uuid);
        expect(Helpers.validateUUID("ezfzef3151ef")).toBeFalsy();
        expect(Helpers.validateUUID()).toBeFalsy();
    });
    test('test if an empty string', () => {
        expect(Helpers.validateUUID("")).toBeFalsy();
    });
});

 describe('poseTest', () => {
    test('test if values return correct poseCode', () => {
        expect(Helpers.checkPosture(200, 33)).toEqual(1);
        expect(Helpers.checkPosture(320, 240)).toEqual(4);
        expect(Helpers.checkPosture(151, 240)).toEqual(2);
        expect(Helpers.checkPosture(350, 2)).toEqual(3);
        expect(Helpers.checkPosture(-1, 240)).toEqual(5);
    })
}); 