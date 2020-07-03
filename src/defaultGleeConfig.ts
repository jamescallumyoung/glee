import { GleeConfig } from './GleeConfig';

export const defaultGleeConfig: GleeConfig = {
    validationOptions: {
        allowUnknown: false
    },
    requestErrorCode: 400,
    responseErrorCode: 500,
}
