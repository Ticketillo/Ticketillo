/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EditUserRequest } from "models";
import type { UserDto } from "models";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserApi {
    /**
     * Create an event
     * @param requestBody
     * @returns UserDto
     * @throws ApiError
     */
    public static createEvent(requestBody: EditUserRequest): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/user",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get all users
     * @returns UserDto
     * @throws ApiError
     */
    public static getAll(): CancelablePromise<Array<UserDto>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/user",
        });
    }

    /**
     * Get an user
     * @param address
     * @returns UserDto
     * @throws ApiError
     */
    public static getUser(address: string): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/user/{address}",
            path: {
                address: address,
            },
        });
    }
}
