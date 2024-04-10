import {User} from "./User.ts";

export type FriendRequest = {
    id: string;
    sender: User;
    receiver: User;
    status: "pending" | "accepted" | "rejected";
    timestamp: string;
}