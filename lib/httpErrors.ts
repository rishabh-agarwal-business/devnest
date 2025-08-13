export type ErrorTypes = Record<string, string[]>;

export class RequestError extends Error {
    statusCode: number;
    errors?: ErrorTypes;

    constructor(stausCode: number, message: string, errors?: ErrorTypes) {
        super(message);
        this.statusCode = stausCode;
        this.errors = errors;
        this.name = 'RequestError';
    }
}

export class ValidationError extends RequestError {
    constructor(fieldErrors: ErrorTypes) {
        const message = ValidationError.formatMessage(fieldErrors);
        super(400, message, fieldErrors);
        this.name = 'ValidationError';
        this.errors = fieldErrors;
    }

    static formatMessage(errors: Record<string, string[]>): string {
        const simplifyMessage = (msg: string) => {
            if (msg === 'Required' || msg.includes('expected string, received undefined')) {
                return 'is required';
            }
            return msg;
        };

        const formattedMessages = Object.entries(errors).map(([field, messages]) => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

            if (!Array.isArray(messages) || messages.length === 0) {
                return `${fieldName} has an unknown error`;
            }

            const simplified = messages.map(simplifyMessage).join(' and ');
            return `${fieldName} ${simplified}`;
        });

        return formattedMessages.join(', ');
    }

}

export class NotFoundError extends RequestError {
    constructor(resource: string) {
        super(404, `${resource} not found`);
        this.name = 'NotFoundError';
    }
}

export class ForbiddenError extends RequestError {
    constructor(message: string = 'Forbidden') {
        super(403, message);
        this.name = 'ForbiddenError';
    }
}

export class UnauthorizedError extends RequestError {
    constructor(message: string = 'Unauthorized') {
        super(401, message);
        this.name = 'UnauthorizedError';
    }
}
