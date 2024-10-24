class HttpException extends Error {
  /**
   * Constructs a new HttpException.
   * @param {number} statusCode - The HTTP status code.
   * @param {string} [message] - Optional custom error message.
   * @param {Error} [cause] - Optional original error causing this exception.
   */
  constructor(statusCode, message, cause) {
    // If message is not provided, use the standard HTTP status message.
    if (!message) {
      message = HttpException.statusMessages[statusCode] || 'Error';
    }
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    if (cause) {
      this.cause = cause;
    }

    // Capture the stack trace, excluding this constructor call.
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Mapping of HTTP status codes to standard messages.
   */
  static statusMessages = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    301: 'Moved Permanently',
    302: 'Found',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    503: 'Service Unavailable',
    // Add other status codes as needed
  };
}

module.exports = { HttpException };
