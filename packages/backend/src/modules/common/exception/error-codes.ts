import { HttpStatus } from "@nestjs/common";

// Define app error codes
enum AppErrorCode {}

export const ErrorCode = { ...AppErrorCode };
export type ErrorCodeType = AppErrorCode;

export const ErrorBody: { [code in ErrorCodeType]: { statusCode: HttpStatus; message: string } } = {
    // Define app error code bodies
};
