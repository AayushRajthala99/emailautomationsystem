const yup = require('yup');
const {
    getColumnInfo,
} = require('../utils/utils');

let inputLength = {
    min: 3,
    max: 60
}

//Validation Schema for User Registration...
const linkSchemaRegister = yup.object({
    body: yup.object({
        fullname: yup
            .string()
            .min(inputLength.min, '* Invalid Value Length!')
            .max(inputLength.max, '* Invalid Value Length!')
            .required('* NAME REQUIRED!'),

        email: yup
            .string()
            .min(inputLength.min, '* Invalid Value Length!')
            .max(inputLength.max, '* Invalid Value Length!')
            .matches(/[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/,
                "* Invalid Format!"
            )
            .required('* Email Required!')
            .test('* Existing Email!', '* Existing Email!', () => {
                return userArray.result.length === 0;
            }),

        password: yup
            .string()
            .min(inputLength.min, '* Invalid Value Length!')
            .max(inputLength.max, '* Invalid Value Length!')
            .required('* Password Required!'),

        confirmpassword: yup
            .string()
            .min(inputLength.min, '* Invalid Value Length!')
            .max(inputLength.max, '* Invalid Value Length!')
            .oneOf([yup.ref('password'), null], '* Password Mismatch!')
            .required('* Password Required!'),
    })
});

// Validation Function for Registration Store...
const validateRegister = (schema) => async (req, res, next) => {
    try {
        const {
            fullname,
            email,
            password,
            confirmpassword,
        } = req.body;

        const result = {
            fullname: fullname,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
        };

        userArray = await getColumnInfo('user', 'email', 'email', email);
        if (userArray.status) {
            try {
                await schema.validate({
                    body: req.body,
                }, {
                    abortEarly: false
                }, );
                return next();
            } catch (error) {
                const errorMessage = {
                    fullname: null,
                    email: null,
                    password: null,
                    confirmpassword: null,
                };

                // Storing error message
                error.inner.forEach((e) => {
                    if (e.path.slice(5) == 'fullname') {
                        errorMessage.fullname = e.errors[0];
                    } else if (e.path.slice(5) == 'email') {
                        errorMessage.email = e.errors[0];
                    } else if (e.path.slice(5) == 'password') {
                        errorMessage.password = e.errors[0];
                    } else if (e.path.slice(5) == 'confirmpassword') {
                        errorMessage.confirmpassword = e.errors[0];
                    }
                });

                res.render('register/index', {
                    result: result,
                    errorMessage: errorMessage
                });
            }
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    linkSchemaRegister,
    validateRegister,
}