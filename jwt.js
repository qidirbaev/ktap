import Joi from "joi";

const UserSchema = Joi.object({
    first_name: Joi.string().required().min(6),
    last_name: Joi.string().required(),
    email: Joi.string().email().required().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
    password: Joi.string().required().min(6),
    phone_number: Joi.string().required()
});

const result = UserSchema.validate({
    first_name: 'Bosdasd',
    last_name: 'Bogdan',
    email: 'bogdan@gmail.com',
    password: '',
    phone_number: '+380937777777'
});

console.log(result);


// class ClassWithPrivateField {
//     #privateField;
  
//     constructor() {
//       this.#privateField = 42;
//     }
// }
  
// class SubClass extends ClassWithPrivateField {
//     #subPrivateField = 2211;

//     constructor() {
//         super();
//         this.#subPrivateField = 23;
//         console.log(this.#subPrivateField);
//     }

//     changer() {
//         this.#subPrivateField = 235;
//         console.log(this.#subPrivateField);
//     }
    
// }

// const sub = new SubClass();
// sub.changer();
// // console.log(sub.#subPrivateField);
// // SubClass {#privateField: 42, #subPrivateField: 23}
  


// // const bool = true;

// // function ex(a, b) {
// //     console.log(a, b);
// //     // return a + b;
// // }

// // const obj = {};

// // const a = obj.a?.b;

// // console.log(a);
// // console.log(obj.a);
// // console.log(obj.a?.b);

// // a && console.log(ex(1, 2));

// // if (bool && ex(1, 3)) console.log("Expression evaluated to true");

// // bool && ex(2, 4);

// // import jwt from 'jsonwebtoken';

// // const obj = {
// //     _id: 234523452345
// // };

// // const token = jwt.sign(obj, 'shhhhh', {
// //     expiresIn: '1h',
// //     algorithm: 'HS256'
// // });

// // // log to console the token
// // console.log('token: ', token);

// // // decode the token
// // const decoded = jwt.verify(token, 'shhhhh', {
// //     algorithms: ['HS256'],
// // });

// // // log to console the decoded token
// // console.log('decoded: ', decoded);