package org.example.backend.security;

import org.example.backend.model.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserAuthController {

    @GetMapping("/me")
    public User getMe(@AuthenticationPrincipal OAuth2User user) {
        Map<String, Object> details = user.getAttributes();
        return new User(
                (String) details.get("sub"),
                (String) details.get("name"),
                (String) details.get("given_name"),
                (String) details.get("family_name"),
                (String) details.get("email"),
                (String) details.get("picture")
        );
    }
}

