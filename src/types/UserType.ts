import { AddressType } from './AddressType'
import { PictureType } from './PictureType'

export interface UserType extends AddressType {
    _id?: string
    picture?: PictureType
    created?: string
    updated?: string
    full_name?: string
    user_name?: string
    email?: string
    birthday?: string
    phone?: string
    person_type?: string
    document_type?: string
    document_number?: string
    password?: string
}
