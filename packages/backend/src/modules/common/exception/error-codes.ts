import { HttpStatus } from "@nestjs/common";
import { AuthErrorCode, AuthErrorBody } from "@peersyst/auth-module";

// Define app error codes
enum AppErrorCode {}

export const ErrorCode = { ...AppErrorCode, ...AuthErrorCode };
export type ErrorCodeType = AppErrorCode | AuthErrorCode;

export const ErrorBody: { [code in ErrorCodeType]: { statusCode: HttpStatus; message: string } } = {
    ...AuthErrorBody,
    // Define app error code bodies
};
