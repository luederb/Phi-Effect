package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    @GetMapping("/me")
    public User getMe(@AuthenticationPrincipal OAuth2User user) {
        return new User(user.getAttributes());
    }

}