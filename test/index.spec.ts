import { ApolloDeprecatedHighlight } from '../src/index';
jest.mock('graphql');
import { getDirectiveValues } from 'graphql';
jest.mock('../src/utils');
import { getFieldDef, getSchemaDirective, getExtensions } from '../src/utils';

describe('apolloDeprecatedHighlight', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    it ('should get deprecation if there is deprecated field', async () => {
        (getDirectiveValues as any).mockImplementation(() => {
            return {
                reason: 'age is deprecated'
            };
        });

        (getFieldDef as any).mockImplementation((info: any) => {
            return {
                astNode: {}
            };
        });

        (getSchemaDirective as any).mockImplementation((info: any, directiveName: string) => {
            return {
                astNode: {}
            };
        });

        (getExtensions as any).mockImplementation((requestContext: any) => {
            if (requestContext.response.body?.singleResult?.extensions) {
                return requestContext.response.body.singleResult.extensions;
            }
            requestContext.response.body.singleResult = {
                extensions: {}
            }
            return requestContext.response.body.singleResult.extensions;
        });

        const requestDidStart = await ApolloDeprecatedHighlight().requestDidStart(null);
        const executionDidStart = await requestDidStart.executionDidStart(null);
        executionDidStart.willResolveField({
            source: null,
            args: null,
            contextValue: null,
            info: {
                fieldName: 'age',
            }
        });
        
        const requestContext = { response: { body: { singleResult: {}}} };
        await requestDidStart.willSendResponse(requestContext);
        
        expect((requestContext as any).response.body.singleResult.extensions.deprecations[0].field).toBe('age');
    })

    it ('should not add duplicated deprecations', async () => {
        (getDirectiveValues as any).mockImplementation(() => {
            return {
                reason: 'age is deprecated'
            };
        });

        (getFieldDef as any).mockImplementation((info: any) => {
            return {
                astNode: {}
            };
        });

        (getSchemaDirective as any).mockImplementation((info: any, directiveName: string) => {
            return {
                astNode: {}
            };
        });

        (getExtensions as any).mockImplementation((requestContext: any) => {
            if (requestContext.response.body?.singleResult?.extensions) {
                return requestContext.response.body.singleResult.extensions;
            }
            requestContext.response.body.singleResult = {
                extensions: {}
            }
            return requestContext.response.body.singleResult.extensions;
        });

        const requestDidStart = await ApolloDeprecatedHighlight().requestDidStart(null);
        const executionDidStart = await requestDidStart.executionDidStart(null);
        executionDidStart.willResolveField({
            source: null,
            args: null,
            contextValue: null,
            info: {
                fieldName: 'age',
            }
        });

        executionDidStart.willResolveField({
            source: null,
            args: null,
            contextValue: null,
            info: {
                fieldName: 'age',
            }
        });
        
        const requestContext = { response: { body: { singleResult: {}}} };
        await requestDidStart.willSendResponse(requestContext);
        
        expect((requestContext as any).response.body.singleResult.extensions.deprecations.length).toBe(1);
    })
})