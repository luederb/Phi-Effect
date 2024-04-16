import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import {User} from "../../Types/User.ts";
import {FriendRequest} from "../../Types/FriendRequest.ts";

export function fetchCurrentUser(setCurrentUser: (user: User) => void) {
    axios.get("/api/users/me", {
    })
        .then(response => {
            response.data.newUser = false;
            setCurrentUser(response.data)
            localStorage.setItem("currentUserId", response.data.id)
            Logger.log("User data loaded:", response.data);
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                Logger.log("Unauthorized. Clearing user ID from local storage.");
                localStorage.removeItem("currentUserId");
            } else {
                Logger.error("An error occurred while loading user data:", error);
            }
        });
}
export function fetchAllUsers(setUsers: (users: User[]) => void, currentUser: User, setCurrentUser: (user: User) => void, currentUserId: string) {
    axios.get("/api/users")
        .then(response => {
            setUsers(response.data);
            setCurrentUser(response.data.find((user: { id: string | null; }) => user.id === currentUserId));
            Logger.log("Users: ", response.data);
            Logger.log("Current User: ", currentUser);
        })
        .catch(error => {
            Logger.error("Error fetching users: ", error);
        })
}


export function fetchFriends(currentUserId: string, setFriends: (friends: User[]) => void) {
    axios.get(`/api/users/${currentUserId}/friends`)
        .then(response => {
            Logger.log("Friends: ", response.data)
            setFriends(response.data);
        })
        .catch(error => {
            Logger.error("Error fetching friends: ", error);
        })
}

export function fetchSentFriendRequestsForCurrentUser(currentUserId: string, setSentFriendRequests: (friendRequests: FriendRequest[]) => void) {
    axios.get(`/api/users/${currentUserId}/sentFriendRequestsForCurrentUser`)
        .then(response => {
            Logger.log("Sent Friend requests: ", response.data)
            setSentFriendRequests(response.data);
        })
        .catch(error => {
            Logger.error("Error fetching friend requests: ", error);
        })
}

export function fetchReceivedFriendRequestsForCurrentUser(currentUserId: string, setReceivedFriendRequests: (friendRequests: FriendRequest[]) => void) {
    axios.get(`/api/users/${currentUserId}/receivedFriendRequestsForCurrentUser`)
        .then(response => {
            Logger.log("Received Friend requests: ", response.data)
            setReceivedFriendRequests(response.data);
        })
        .catch(error => {
            Logger.error("Error fetching friend requests: ", error);
        })
}