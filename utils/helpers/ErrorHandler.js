
export class ErrorFor extends Error {
    constructor(_name, _statusCode, _message) {
        super();
        this.name = _name;
    }
}

// error handler
export const Response = (err, req, res, next) => {
    if (err.name === 'Create Data') {
        return res.status(400).json({
            success: false,
            message: 'Validatsiya xatosi'
        });
    }
    if (err.name === 'Update Data') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID'
        });
    }
    if (err.name === 'Delete Data') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID'
        });
    }
    if (err.name === 'Find User') {
        return res.status(400).json({
            success: false,
            message: 'Not Found User'
        });
    }
    if (err.name === 'Exist User') {
        return res.status(400).json({
            success: false,
            message: 'User Already exist'
        });
    }
    if (err.name === 'Invalid Token') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
    if (err.name === 'Expired Token') {
        return res.status(401).json({
            success: false,
            message: 'Token expired'
        });
    }
    if (err.name === 'No Token') {
        return res.status(401).json({
            success: false,
            message: 'No token Provided'
        });
    }
    if (err.name === 'Validation') {
        return res.status(401).json({
            success: false,
            message: 'Please fill all fields correctly'
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Server error'
    });
}


// sample usage
// const test = () => {
//     Response(new ErrorFor('Validation'), req, res);
// }
