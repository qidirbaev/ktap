// import { authenticate } from '../helpers/validators/authenticate.js';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { UserSchema } from '../models/Schemas/UserSchema.js';
import { User } from '../models/Database/UserModel.js';
import { SERVER_MESSAGES } from '../utils/constants/server-messages.js';
import { JWT_PRIVATE_KEY } from '../config/Auth.js';
import { findOnePromise, comparePromise, hashPromise } from '../utils/helpers/CRUD.js';
import logger from '../utils/helpers/logger.js';
import { ErrorFor, Response } from '../utils/helpers/ErrorHandler.js';
import { debug } from '../utils/helpers/debug.js';

{
    // const find_user_from_database = (username, db, callback) => {
    //     (username && db) ? db.find(u => {
    //         if (u.username === username)
    //             return callback(null, u);
    //     }) : callback('Userni topishda xatolik yuz berdi', false);
    // }

    // // hash all passwords in database
    // const hash_all_passwords = (db, callback) => {

    //     if (!db)
    //         return callback('Database bo\'sh', false);

    //     let hashed_db = [];
    //     db.map((user) => {
    //         hash(user.password, 10, (err, hash) => {

    //             hashed_db.push({
    //                 id: user.id,
    //                 username: user.username,
    //                 password: hash
    //             });

    //             if (user.id === db.length)
    //                 callback(null, hashed_db);

    //         });
    //     });
    // };

    // export const homer = async (req, res) => {
    //     res.render('pages/home');
    //     // res.end();
    // }

    // export const signup_get = async (req, res) => {
    //     const result = await UserRegistrationSchema.validateAsync(req.query);
    //     console.log(req.query);
    //     const isValidUser = await UserRegistrationModel.find({
    //         $or: [
    //             { email: req.query.email },
    //             { phone: req.query.phone_number }
    //         ]
    //     });

    //     if (isValidUser.length > 0) {
    //         res.status(400).json({ success: false, message: 'Bu email yoki telefon raqami mavjud' });
    //     } else if (result.error) {
    //         res.status(400).json({ success: false, message: SERVER_MESSAGES.uzb.VALIDATION_ERROR });
    //     } else {
    //         let user = new UserRegistrationModel(req.query);

    //         hash(user.password, 10, (err, hash) => {
    //             if (err) {
    //                 res.status(500).json({ success: false, message: SERVER_MESSAGES.uzb.INTERNAL_SERVER_ERROR });
    //             } else { user.password = hash; }
    //         });
    //         user.save()
    //             .then(() => {
    //                 const token = jwt.sign({ _id: user._id }, JWT_PRIVATE_KEY, {
    //                     expiresIn: '1h'
    //                 });
    //                 logger.info('[SIGNUP] You are signed up & in!');
    //                 res
    //                     .status(201)
    //                     .cookie('token', token, {
    //                         httpOnly: true,
    //                         expires: new Date(Date.now() + 60 * 60 * 1000),
    //                         secure: process.env.NODE_ENV === 'production'
    //                     })
    //                     .json({ success: true, message: SERVER_MESSAGES.uzb.USER_SIGNED_UP });
    //             })
    //             .catch(err => {
    //                 logger.error(err);
    //                 res.status(500).json({ success: false, message: SERVER_MESSAGES.uzb.INTERNAL_SERVER_ERROR });
    //             });
    //     }

    // }

    // export const home = (req, res) => {
    //     res.locals.username = req.session.user;
    //     res.render('login');
    //     delete res.locals.username;
    // };

    // export const login = (req, res) => {
    //     return res.render('home');
    // };

    // export const social = (req, res) => {
    //     const username = req.query?.first_name;
    //     const password = req.query?.hash;

    //     if (!req.query && !username && !password) {
    //         res.status(400).json({ success: false, message: 'Barcha maydonlar to\'g\'ri to\'ldirilishi kerak' });
    //     } else {
    //         const result = UserSchema.validate({ username, password });
    //         console.log('1')
    //         hash_all_passwords(users, (err, db) => {
    //             if (!err) {
    //                 console.log('2')
    //                 find_user_from_database(username, db, (err, user) => {
    //                     if (!err && user && !result.error) {
    //                         console.log('3')
    //                         compare(password, user.password, (err, result) => {
    //                             if (!err && result) {
    //                                 console.log('4')
    //                                 const token = jwt.sign({ _id: user.id }, JWT_PRIVATE_KEY, {
    //                                     expiresIn: '1h'
    //                                 });
    //                                 logger.info('[SIGNIN] You are logged in!');
    //                                 res.status(201).cookie('token', token, {
    //                                     httpOnly: true,
    //                                     expires: new Date(Date.now() + 60 * 60 * 1000),
    //                                     secure: process.env.NODE_ENV === 'production'
    //                                 })
    //                                     .json({ success: true, message: 'Tizimga muvaffaqiyatli kirildi' })
    //                             } else {
    //                                 res.status(401).json({ success: false, message: 'Parol xato' });
    //                             }
    //                         });
    //                     } else {
    //                         console.log('5')
    //                         res.status(401).json({ success: false, message: 'Parol yoki login no\'tog\'ri kiritilgan' });
    //                     }
    //                 });
    //             } else {
    //                 console.log('6')
    //                 res.status(500).json({ success: false, message: 'Userlarni heshlashda xatolik yuz berdi' });
    //             }
    //         });
    //         console.log('7')
    //     }
    // }

    // export const logout = (req, res) => {
    //     return res.clearCookie('token')
    //         .status(200)
    //         .json({ success: true, message: 'Muvafaqqiyatli logout bajarildi' })
    // };

    // export const restricted = (req, res) => {
    //     res.send('Wahoo! restricted area, click to <a href="/auth/logout">logout</a>');
    // };
}

export const signin = async (req, res) => {

    debug(0, req.body);

    const user = await findOnePromise(User, { email: req.body?.email });

    if (!user.ok)
        return Response(new ErrorFor('Find User'), req, res);

    debug(1, user.ok);
    
    const decoded_password = await comparePromise(req.body.password, user.password);

    debug(2, decoded_password);

    if (!decoded_password.ok)
        return Response(new ErrorFor('Find User'), req, res);

    debug(3, !decoded_password, !user);
        
    const token = jwt.sign({ _id: user._id }, JWT_PRIVATE_KEY, {
        // expire in 1 minute
        expiresIn: '1m'
    });

    debug(4, token);

    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name
    }

    debug(5, req.session.user);

    req.session.token = token;

    debug(6, req.session.token);
    
    res.status(201)
        .json({ success: true, message: 'Foydalanuvchi muvaffaqiyatli login bo\'ldi', redirect: '/' });

    debug(7, req.session);
        
    Response(new ErrorFor(), req, res);

};

export const signup = async (req, res) => {

    debug(0, req.body);
    
    const val_res = UserSchema.validate(req.body);

    debug(1, val_res);
    
    if (val_res.error)
        return Response(new ErrorFor('Validation'), req, res);

    debug(2, val_res.error);

    const isExistUser = await findOnePromise(User, { email: req.body?.email });

    debug(3, isExistUser);
    
    if (isExistUser.ok)
        return Response(new ErrorFor('Exist User'), req, res);
        
    debug(4, isExistUser.ok);

    const hashv = await hashPromise(req.body.password, 10);

    debug(5, hashv);
    
    if (!hashv.ok)
        return Response(new ErrorFor(), req, res)
        
    debug(6, hashv.ok);

    const new_user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashv.hash,
        phone_number: req.body.phone_number.split(' ').join(''),
    });
    
    debug(7, new_user);

    await new_user.save()
        .then(() => {
            const token = jwt.sign({_id: new_user._id}, JWT_PRIVATE_KEY, {
                expiresIn: '1m'
            });

            debug(8, token);
                        
            logger.info('[SIGNUP] You are signed up & in!');
            req.session.user = {
                first_name: new_user.first_name,
                last_name: new_user.last_name
            }

            debug(9, req.session.user);

            req.session.token = token;

            debug(10, req.session.token);
            
            res
                .status(201)
                .json({ success: true, message: SERVER_MESSAGES.uzb.USER_SIGNED_UP, redirect: '/' });
        })
        .catch(err => {
            console.log('Userni saqlashda xatolik: ', err);
            Response(new ErrorFor(), req, res);
        });
        
}
