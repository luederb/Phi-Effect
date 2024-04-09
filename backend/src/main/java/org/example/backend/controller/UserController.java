package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
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
    public void deleteUserById(@PathVariable String id){
        userService.deleteUserById(id);
    }
    @PutMapping("/{userId}/updateFavoriteProjectsOfUser/{projectId}")
    public User updateUserById(@PathVariable String userId, @PathVariable String projectId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        if(user.getFavoriteProjects().contains(projectId)) {
            return userService.removeFavoriteProject(user, projectId);
        } else {
            return userService.addFavoriteProject(user, projectId);
        }
    }
}
