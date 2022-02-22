import Joi from "Joi";
import JoiDate from "@joi/date";
import { SexualOrientation, ShowMeGender } from "@prisma/client";
import { matchError } from "../helpers/validation/betterSingleJoiMessage";
import { dateRestriction } from "../helpers/validation/constants";
import { joiValidateEnums } from "../helpers/validation/functions";
import { regexBasicAlphabet, regexPassword } from "../helpers/validation/regexes";

// extend Joi with Joi Date
const JoiExtend = Joi.extend(JoiDate);

// Birthday is immutable after user is created
const joiBirthday = {
    birthday: JoiExtend.date().required().format("YYYY-MM-DD").min("1900-01-01").max(dateRestriction),
};

const joiGeneralInfo = {
    name: Joi.string().trim().min(2).max(128).pattern(regexBasicAlphabet),
    surname: Joi.string().trim().min(2).max(128).pattern(regexBasicAlphabet),
    gender: Joi.string().trim().min(2).max(128),
    sexualOrientation: Joi.array()
        .unique()
        .max(3)
        .items(Joi.string().custom(joiValidateEnums(Object.keys(SexualOrientation)))),
};

const joiAdditionalInfo = Joi.object({
    city: Joi.string().trim().min(2).max(128).pattern(regexBasicAlphabet),
});

const joiMatchingInfo = Joi.object({
    showMeGender: Joi.string()
        .trim()
        .custom(joiValidateEnums(Object.keys(ShowMeGender))),
});

const joiSinglePassword = {
    password: Joi.string().trim().required().min(2).max(128).pattern(regexPassword),
};

const joiPasswordWithRepetition = {
    ...joiSinglePassword,
    passwordRepetition: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .label("password repetition")
        .messages({
            "any.only": matchError(`"passwords"`),
        }),
};

const joiEmail = {
    email: Joi.string().trim().email().required(),
};

export const passwordWithRepetitionSchema = Joi.object({
    ...joiPasswordWithRepetition,
});

export const emailSchema = Joi.object({
    ...joiEmail,
});

const requiredJoiGeneralInfo = Joi.object(joiGeneralInfo).options({ presence: "required" });

export const createUserSchema = Joi.object({
    ...joiEmail,
    ...joiPasswordWithRepetition,
    ...joiBirthday,
}).concat(requiredJoiGeneralInfo);

export const generalInfoSchema = Joi.object({
    ...joiGeneralInfo,
});

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string(),
    ...joiPasswordWithRepetition,
});

export const singlePasswordSchema = Joi.object({
    ...joiSinglePassword,
});