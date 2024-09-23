const express = require('express');
const app = express();
const router = express.Router();

                    /* Authentication */

/* Auth controllers */  
                  
const usercontrollers=require('../controllers/signInController');

/* Auth Validators */

const{validateUser}=require('../auth/validator/userValidator');
const {authenticateToken} = require('../auth/validator/tokenvalidator');


/* Auth Routers */                    

router.post('/createUser',validateUser,usercontrollers.createUser);
router.post('/login',usercontrollers.signInApi);
router.get('/checktoken',authenticateToken);



module.exports=router;

