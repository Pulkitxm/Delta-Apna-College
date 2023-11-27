const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().allow("",null),
        price:Joi.number().required().min(0) ,
        location:Joi.string().required(),
        country:Joi.string().required(),
        review:Joi.array
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().required()
    }).required()
})