const Joi= require('joi');


module.exports.userSchema = Joi.object({
    user : Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    vacant: Joi.number().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    pin: Joi.number().required(),
    password: Joi.string().min(3).required(),
    budget: Joi.number().required(),
    image: Joi.string().required(),
    reviews: Joi.array().items(Joi.string().hex().length(24)) 

    }).required(),
});

module.exportsreviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        Comment:Joi.string().required(),
    }).required()
})