import * as Yup from 'yup' 

export const fromValidation = Yup.object({
    Email:Yup.string().email().required("Please Enter Email Address!!!"),
    name:Yup.string().min(2).max(25).required("Please Enter Your Name!!!"),
    contact:Yup.string().min(6).max(11),


});
