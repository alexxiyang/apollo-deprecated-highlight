import { getDirectiveValues } from 'graphql';
import { getFieldDef, getSchemaDirective } from './utils';

interface Deprecation {
    field: string,
    reason: string,
}

export const apolloDeprecatedHighlight = () => {
    return {
        requestDidStart: async (initialRequestContext: any) => {
            const newDeprecations: Deprecation[] = [];
            return {
                async executionDidStart(executionRequestContext: any) {
                    return {
                        willResolveField({ source, args, contextValue, info }: any) {
                            const fieldDef = getFieldDef(info);
                            const directive = getSchemaDirective(info, 'deprecated');
                            const fieldAstNode = fieldDef.astNode;
                            if (!directive || !fieldAstNode) {
                                return;
                            }
                            const directiveValue = getDirectiveValues(directive, fieldAstNode);
                            if (!directiveValue) {
                                return;
                            }
                            newDeprecations.push({
                                field: info.fieldName as string,
                                reason: directiveValue.reason as string,
                            });
                            return (_error: any, _result: any) => {};
                        },
                    };
                },
                async willSendResponse(requestContext: any) {
                    if (newDeprecations.length > 0) {
                        if (!requestContext.response.extensions) {
                            requestContext.response.extensions = {};
                        }
                        if (!requestContext.response.extensions.deprecations) {
                            requestContext.response.extensions.deprecations = [];
                        }
                        requestContext.response.extensions.deprecations =
                            requestContext.response.extensions.deprecations.concat(newDeprecations);
                    }
                },
            };
        },
    };
};
