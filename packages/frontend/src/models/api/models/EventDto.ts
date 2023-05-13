/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventAttributeDto } from './EventAttributeDto';
import type { User } from './User';

export type EventDto = {
    id: number;
    address: string;
    creatorAddress?: string;
    name: string;
    description: string;
    external_url: string;
    image: string;
    attributes: Array<EventAttributeDto>;
    user?: User;
};

