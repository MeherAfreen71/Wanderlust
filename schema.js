const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        image : Joi.alternatives().try(   //it allows both types of image , one is object which is in my schema-
            Joi.string().allow("", null), // -and another one is for that when some user sends url in the image form.
            Joi.object({
                url : Joi.string().allow("", null)
            })
        ),
        price : Joi.number().required().min(0),
        country : Joi.string().required(),
        location : Joi.string().required(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required(),
});


//Joi is a package of Node.js which ensure the model's schemas are valid and
//Joi internally is a big object which has it's all key as a
//method and those methods are also contain an object.