import { ValidationOptions } from '@hapi/joi';

export interface GleeConfig {
    validationOptions: ValidationOptions,
    requestErrorCode: number,
    responseErrorCode: number,
}
