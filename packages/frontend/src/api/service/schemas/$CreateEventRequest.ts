/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateEventRequest = {
    properties: {
        id: {
            type: 'number',
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        address: {
            type: 'string',
        },
        creator_address: {
            type: 'string',
            isRequired: true,
        },
        data: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
