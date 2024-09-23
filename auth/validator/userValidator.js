const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')  
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

    body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

    body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 }) // minimum length of 8 characters
    .withMessage('Password must be at least 8 characters long')
    .matches(/(?=.*[a-z])/) // at least one lowercase letter
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/) // at least one uppercase letter
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/(?=.*[0-9])/) // at least one number
    .withMessage('Password must contain at least one number')
    .matches(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/) // at least one special character
    .withMessage('Password must contain at least one special character'),   
    
    (req, res, next) => {  
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
        {
        const errorObject = errors.array().reverse().reduce((acc, error) => {
          acc[error.path] = error.msg; 
          return acc;
        }, {});
        return res.status(400).json({ errors: errorObject });
      }
      next();
    }
  ];
  

  

module.exports = { validateUser };