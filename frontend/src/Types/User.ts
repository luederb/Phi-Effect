import {Friend} from "./Friend.ts";

export type User = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: number;
    bio?: string;
    picture: string;
    favoriteProjects?: string[];
    friends?: Friend[];
}