export function getFieldDef(info: any) {
    const parentTypeFields = info.parentType.getFields();
    return parentTypeFields[info.fieldName];
}

export function getSchemaDirective(info: any, directiveName: string) {
    return info.schema.getDirective(directiveName);
}