import { getExtensions, getFieldDef, getSchemaDirective } from '../src/utils';
// jest.mock('../src/utils');
// import { getFieldDef, getSchemaDirective, getExtensions } from '../src/utils';

describe('apolloDeprecatedHighlight', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    describe('getExtensions', () => {
        it ('should get extensions if there is no extensions attribute', () => {
            const requestContext = { response: { body: {singleResult: {}} } };
            expect(getExtensions(requestContext)).toEqual({});
        })
    
        it ('should get extensions if there is no extensions attribute', () => {
            const requestContext = { response: { body: {singleResult: { extensions: {}}} } };
            expect(getExtensions(requestContext)).toEqual({});
        })
    })

    describe('getFieldDef', () => {
        it('should get field def', () => {
            const info = { fieldName: "foo", parentType: { getFields: () => { return {"foo":"bar"}}}};
            expect(getFieldDef(info)).toBe("bar");
        })
    })

    describe('getSchemaDirective', () => {
        const info = { schema: { getDirective: (directiveName: string) => { return 'bar' }}};
        expect(getSchemaDirective(info, 'foo')).toBe('bar');
    })
})