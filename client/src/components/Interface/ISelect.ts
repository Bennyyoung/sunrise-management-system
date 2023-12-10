import { ChangeEvent } from 'react';

export interface ISelect {
    name: string
    label: string
    value: string
    className: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    required: boolean
    options: {
        value: string;
        data: string;
    }[]
}