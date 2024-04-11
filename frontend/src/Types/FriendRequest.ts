import {User} from "./User.ts";

export type FriendRequest = {
    id: string;
    sender: User;
    receiver: User;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    timestamp: string;
}