class ApplicationError extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        
        this.name = this.constructor.name;
        
        this.message = message || 
            'Something went wrong. Please try again.';
        
        this.status = status || 500;
    }
}

class BadRequestError extends ApplicationError {
    constructor(message, code) {
        super(message, code);
    }
}

class InternalError extends ApplicationError {
    constructor(message, code) {
        super(message, code);
    }
}
module.exports = { BadRequestError, InternalError } ;