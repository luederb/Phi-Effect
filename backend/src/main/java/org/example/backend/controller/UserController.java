package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping("/me")
    public User getMe(@AuthenticationPrincipal OAuth2User user) {
        return new User(user.getAttributes());
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return service.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUserById(@PathVariable String id, @RequestBody User user) {
        if (!user.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return service.saveUser(user);
    }
    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable String id){
        service.deleteUserById(id);
    }
}
