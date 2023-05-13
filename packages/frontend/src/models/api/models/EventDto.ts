/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventAttributeDto } from './EventAttributeDto';

export type EventDto = {
    id: number;
    address: string;
    creatorAddress?: string;
    name: string;
    description: string;
    external_url: string;
    image: string;
    attributes: Array<EventAttributeDto>;
};

