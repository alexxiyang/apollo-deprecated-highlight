export function getFieldDef(info: any) {
    const parentTypeFields = info.parentType.getFields();
    return parentTypeFields[info.fieldName];
}

export function getSchemaDirective(info: any, directiveName: string) {
    return info.schema.getDirective(directiveName);
}

/**
 * Get apollo 4 response extensions
 * @param requestContext 
 * @returns 
 */
export function getExtensions(requestContext: any) {
    // apollo 4
    if (requestContext.response.body.singleResult) {
        // single
        if (!requestContext.response.body.singleResult.extensions) {
            requestContext.response.body.singleResult.extensions = {};
        }
        return requestContext.response.body.singleResult.extensions;
    } else if (requestContext.response.body.initialResult) {
        //incremental
        // TODO: implement incremental
        return {};
    }
}