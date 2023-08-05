import joi from 'joi';

export const schemaUrl = joi.object({
    url: joi.string().uri().required(),
});
