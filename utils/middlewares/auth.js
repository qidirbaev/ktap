import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../../config/Auth.js';
// import logger from '../helpers/logger.js';
import { promisify } from 'util';
import { ErrorFor } from '../helpers/ErrorHandler.js';
import exp from 'constants';
import logger from '../helpers/logger.js';
import { debug } from '../helpers/debug.js';

const verifyPromise = promisify(jwt.verify);

export const session_message = (req, res, next) => {
    console.log('[SESSION_MESSAGE] req.session', req.session);
    let err = req.session.error;
    let msg = req.session.success;

    const message = (_className, _text) => ({
        class_name: _className,
        text: _text
    });

    let val = (err)
        ? message('error', err)
            : (msg)
                ? message('success', msg)
                    : message('waiting', 'Please, wait...');

    res.locals.class_name = val.class_name
    res.locals.message = val.text;
    next();
};

// validate middleware for json web token
export const validate_token = async (req, res, next) => {
    const token = req.cookies?.token;

    if (token) {
        try {
            await verifyPromise(token, JWT_PRIVATE_KEY);
        } catch (ex) {
            Response(new ErrorFor('No Token'), req, res);
        }
    }

    next();
    
};

export const check_token = async (req, res, next) => {
    // destroy previous session if exists

    const token = req.session?.token;

    debug(1, token);

    if (token) {
        try {
            await verifyPromise(token, JWT_PRIVATE_KEY);
        } catch (ex) {
            req.session.destroy();
        }
    }

    debug(2, req.session);

    next();

}

export const restrict = (req, res, next) => {
    console.log('[RESTRICT] req.session', req.session);
    if (req.session.user)
        return next();
    res.redirect('/');
}
