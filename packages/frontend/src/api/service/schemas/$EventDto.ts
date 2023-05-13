/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EventDto = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        address: {
            type: 'string',
            isRequired: true,
        },
        creatorAddress: {
            type: 'string',
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        external_url: {
            type: 'string',
            isRequired: true,
        },
        image: {
            type: 'string',
            isRequired: true,
        },
        attributes: {
            type: 'array',
            contains: {
                type: 'EventAttributeDto',
            },
            isRequired: true,
        },
    },
} as const;
