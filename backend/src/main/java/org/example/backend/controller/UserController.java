package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.FriendRequest;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/me")
    public User getMe(@AuthenticationPrincipal OAuth2User user) {
        return new User(user.getAttributes());
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUserById(@PathVariable String id, @RequestBody User user) {
        if (!user.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable String id) {
        userService.deleteUserById(id);
    }

    @PutMapping("/{userId}/updateFavoriteProjectsOfUser/{projectId}")
    public User updateUserById(@PathVariable String userId, @PathVariable String projectId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        if (user.getFavoriteProjects().contains(projectId)) {
            return userService.removeFavoriteProject(user, projectId);
        } else {
            return userService.addFavoriteProject(user, projectId);
        }
    }

    @PostMapping("/{id}/friendRequests")
    public FriendRequest sendFriendRequest(@PathVariable String id, @RequestBody User receiver) {
        User sender = userService.getUserById(id);
        return userService.sendFriendRequest(sender, receiver);
    }

    @PutMapping("/{friendId}/friendRequests/{requestId}/accept")
    public User acceptFriendRequest(@PathVariable String friendId, @PathVariable String requestId) {
        User user = userService.getUserById(friendId);
        return userService.acceptFriendRequest(user, requestId);
    }

    @PutMapping("/{friendId}/friendRequests/{requestId}/reject")
    public User rejectFriendRequest(@PathVariable String friendId, @PathVariable String requestId) {
        User user = userService.getUserById(friendId);
        return userService.rejectFriendRequest(user, requestId);
    }

    @GetMapping("/{id}/sentFriendRequestsForCurrentUser")
    public List<FriendRequest> getFriendRequestsForCurrentUser(@PathVariable String id) {
        User user = userService.getUserById(id);
        return userService.getSentFriendRequestsForCurrentUser(user);
    }

    @GetMapping("/{id}/receivedFriendRequestsForCurrentUser")
    public List<FriendRequest> getFriendReceivedRequestsForCurrentUser(@PathVariable String id) {
        User user = userService.getUserById(id);
        return userService.getReceivedFriendRequestsForCurrentUser(user);
    }

    @GetMapping("/{id}/friends")
    public List<User> getFriends(@PathVariable String id) {
        User user = userService.getUserById(id);
        return userService.getFriends(user);
    }

}
