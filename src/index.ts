import { getDirectiveValues } from 'graphql';
import { getExtensions, getFieldDef, getSchemaDirective } from './utils';

interface Deprecation {
    field: string,
    reason: string,
}

export const ApolloDeprecatedHighlight = () => {
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
                            const isAdded = newDeprecations.some((dep: Deprecation) => {
                                return dep.field === info.fieldName;
                            })
                            if (isAdded) {
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
                        const extensions = getExtensions(requestContext);
                        if (!extensions.deprecations) {
                            extensions.deprecations = [];
                        }
                        extensions.deprecations = extensions.deprecations.concat(newDeprecations);
                    }
                },
            };
        },
    };
};
