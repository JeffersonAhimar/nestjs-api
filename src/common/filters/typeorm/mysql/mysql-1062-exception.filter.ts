import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { TypeORMQueryError } from 'src/common/interfaces/typeorm-query-error.interface';
import { QueryFailedError } from 'typeorm';

class QueryError {
  static [Symbol.hasInstance](instance: TypeORMQueryError): boolean {
    return instance instanceof QueryFailedError && instance.errno === 1062; // change # error
  }
}

@Catch(QueryError)
// change # error
export class Mysql1062ExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;
    const driverError = exception.driverError as TypeORMQueryError;

    response.status(status).json({
      status,
      message: driverError.sqlMessage,
    });
  }
}
