
  //Clase para el manejo de errores
  class AppError extends Error {
      constructor(message, statusCode) {
          super(message)
          this.statusCode = this.statusCode
          this.status = `${this.statusCode}`.startsWith('4') || `${statusCode}`.startsWith('5') ? 'fail' : 'error'
          this.isOperational = true
  
          Error.captureStackTrace(this, this.constructor)
      }
  }
  
  const globalErrorHandler = (err, req, res, next) => {
      err.statusCode = err.statusCode || 500
      err.status = err.status || 'error'
      res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
          error: err.statusCode
      })
  }
  
  module.exports = globalErrorHandler;
