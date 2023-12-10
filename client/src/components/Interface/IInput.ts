import { ChangeEvent } from 'react';

export interface IInput {
    label: string
    type: string
    placeholder: string
    className: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    name: string
    value: string
    required: boolean
}