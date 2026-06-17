import { ApiError } from '../utils/ApiError.js';

/* Validates one or more parts of `req` against Joi schemas, mutating in place
   with the parsed/coerced values. */
export const validate = (schemas) => (req, _res, next) => {
  try {
    for (const part of ['params', 'query', 'body']) {
      const schema = schemas[part];
      if (!schema) continue;
      const { value, error } = schema.validate(req[part], {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });
      if (error) {
        const details = Object.fromEntries(
          error.details.map((d) => [d.path.join('.'), d.message]),
        );
        throw ApiError.badRequest('Validation failed', { code: 'VALIDATION', details });
      }
      req[part] = value;
    }      
    next();
  } catch (e) {
    next(e);
  }
};
