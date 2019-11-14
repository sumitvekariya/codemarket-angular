import { User } from './user.model';
import { BlockToolData } from '@editorjs/editorjs';
import { Tag } from './product.model';
import { PostStatus } from './poststatus.enum';

interface Support {
    time: number;
    description: {
        type: string;
        data: BlockToolData
    };
}
interface Location {
    longitude: number;
    latitude: number;
    address: string;
    additionalLocationDetails: string;
}

export interface Event {
    name: string;
    description: [{
        type: string;
        data: BlockToolData
    }];
    type?: string;
    price: number;
    _id?: string;
    status: PostStatus;
    createdBy: User;
    createdAt: string;
    updatedAt: string;
    categories?: [];
    tags: Tag[];
    support: Support;
    dateRange?: string[];
    eventType?: string;
    address?: string;
    location?: Location
}
