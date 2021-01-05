const Helpers = require('../utils/helpers');


//1ste test
describe('string test', () => {
    test('if there is a value in the string', () => {
        expect(Helpers.checkTitle()).toBeFalsy();
        //expect(Helpers.checkTitle([]).toBeFalsy());
    }),
    test('if string has not more than 100 characters', () => {
        expect(Helpers.checkTitle("Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standa")).toBeTruthy();
        expect(Helpers.checkTitle("Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaa")).toBeFalsy();
        expect(Helpers.checkTitle("lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaa")).toBeFalsy();
    })
})