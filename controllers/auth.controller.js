import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/Schemas/UserSchema.js';
import { User } from '../models/Database/UserModel.js';
import { SERVER_MESSAGES } from '../utils/constants/server-messages.js';
import { JWT_PRIVATE_KEY } from '../config/Auth.js';
import { findOnePromise, comparePromise, hashPromise } from '../utils/helpers/CRUD.js';
import logger from '../utils/helpers/logger.js';
import { ErrorFor, Response } from '../utils/helpers/ErrorHandler.js';
import { debug } from '../utils/helpers/debug.js';

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
            const token = jwt.sign({ _id: new_user._id }, JWT_PRIVATE_KEY, {
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

export const logout = (req, res) => {
    console.log('[logout] req.session', req.session);
    const token = req.session?.token;

    if (token) {
        try {
            jwt.verify(token, JWT_PRIVATE_KEY);
        } catch (ex) {
            console.log('Token expired or not valid');
            req.session.destroy();
        }
    }

    console.log('[logout] req.session', req.session);

    res.send('Logout');
}