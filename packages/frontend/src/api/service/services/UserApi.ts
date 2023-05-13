/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDto } from "models";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserApi {
    /**
     * Create an event
     * @returns UserDto
     * @throws ApiError
     */
    public static createEvent(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/user",
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
