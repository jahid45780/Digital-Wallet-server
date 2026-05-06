import { Types } from "mongoose";


export enum Role {
    ADMIN = "ADMIN",
    AGENT = "AGENT",
    USER = "USER",
}

export interface IAuthProvider {
    provider:string;
    providerID:string
}

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
     _id?:Types.ObjectId;
    name?:string;
    email:string;
    password:string;
    phone?:string;
    address?:string;
    picture?:string;
    IsDeleted?:boolean;
    IsVerified?:boolean;
    IsActive?:isActive;
    auths:IAuthProvider[];
    createdAt?:Date;
    role?:Role;
    isApproved: boolean
}