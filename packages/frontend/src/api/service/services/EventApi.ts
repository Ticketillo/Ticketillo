/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventDto } from "models";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class EventApi {
    /**
     * Create an event
     * @returns EventDto
     * @throws ApiError
     */
    public static createEvent(): CancelablePromise<EventDto> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/event",
        });
    }

    /**
     * Get all events
     * @returns EventDto
     * @throws ApiError
     */
    public static getAll(): CancelablePromise<Array<EventDto>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/event",
        });
    }

    /**
     * Get an event
     * @param id
     * @returns EventDto
     * @throws ApiError
     */
    public static getEvent(id: number): CancelablePromise<EventDto> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/event/{id}",
            path: {
                id: id,
            },
        });
    }
}
