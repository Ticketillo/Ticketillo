import { HttpStatus } from "@nestjs/common";

// Define app error codes
enum AppErrorCode {
    INVALID_FILE_TYPE= "INVALID_FILE_TYPE",
}

export const ErrorCode = { ...AppErrorCode };
export type ErrorCodeType = AppErrorCode;

export const ErrorBody: { [code in ErrorCodeType]: { statusCode: HttpStatus; message: string } } = {
    // Define app error code bodies
    [ErrorCode.INVALID_FILE_TYPE]: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorCode.INVALID_FILE_TYPE,
    }
};
