import { apolloDeprecatedHighlight } from '../src/index';
jest.mock('graphql');
import { getDirectiveValues } from 'graphql';
jest.mock('../src/utils');
import { getFieldDef, getSchemaDirective } from '../src/utils';

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

        const requestDidStart = await apolloDeprecatedHighlight().requestDidStart(null);
        const executionDidStart = await requestDidStart.executionDidStart(null);
        executionDidStart.willResolveField({
            source: null,
            args: null,
            contextValue: null,
            info: {
                fieldName: 'age',
            }
        });
        
        const requestContext = { response: {} };
        await requestDidStart.willSendResponse(requestContext);
        
        expect((requestContext as any).response.extensions.deprecations[0].field).toBe('age');
    })
})