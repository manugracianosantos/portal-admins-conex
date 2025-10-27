import { type ExceptionFilter, Catch, type ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common"
import type { Response } from "express"

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = "Internal server error"
    let errors: any = null

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      if (typeof exceptionResponse === "object") {
        message = (exceptionResponse as any).message || message
        errors = (exceptionResponse as any).errors || null
      } else {
        message = exceptionResponse as string
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
    })
  }
}
