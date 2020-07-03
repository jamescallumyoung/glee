import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationOptions } from '@hapi/joi';
import { get } from 'lodash';

import { defaultGleeConfig } from './defaultGleeConfig';
import { GleeConfig } from './GleeConfig';
import { MiddlewareFunction } from './MiddlewareFunction';
import { ReqValidatable } from './ReqValidatable';

export class Glee {
    constructor(
        readonly config: GleeConfig = defaultGleeConfig,
    ) {}

    private getValidationOptions(validationOptions?: ValidationOptions): ValidationOptions {
        return (validationOptions != undefined)
            ? validationOptions
            : this.config.validationOptions;
    }

    public validate(validationPath: ReqValidatable, errorCode: number) {
        return (schema: Schema, validationOptions?: ValidationOptions): MiddlewareFunction => {
            return (req: Request, res: Response, next: NextFunction): void => {
                const toValidate = get(req, validationPath, {});
                const { error } = schema.validate(toValidate, this.getValidationOptions(validationOptions));

                if (error != undefined) {
                    res.status(errorCode).send(error.message.toString());
                }
                else {
                    next();
                }
            };
        };
    }

    // REQUEST VALIDATION

    /**
     * Validate the request path parameters
     */
    public getPathValidator(schema: Schema, validationOptions?: ValidationOptions): MiddlewareFunction {
        return this.validate(ReqValidatable.path, this.config.requestErrorCode)(schema, validationOptions);
    }

    /**
     * Validate the request query parameters
     */
    public getQueryValidator(schema: Schema, validationOptions?: ValidationOptions): MiddlewareFunction {
        return this.validate(ReqValidatable.query, this.config.requestErrorCode)(schema, validationOptions);
    }

    /**
     * Validate the request headers
     */
    public getHeaderValidator(schema: Schema, validationOptions?: ValidationOptions): MiddlewareFunction {
        return this.validate(ReqValidatable.headers, this.config.requestErrorCode)(schema, validationOptions);
    }

    /**
     * Validate the request body
     */
    public getBodyValidator(schema: Schema, validationOptions?: ValidationOptions): MiddlewareFunction {
        return this.validate(ReqValidatable.body, this.config.requestErrorCode)(schema, validationOptions);
    }
} 