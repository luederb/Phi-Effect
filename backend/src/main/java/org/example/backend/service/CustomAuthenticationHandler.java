package org.example.backend.service;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.NoSuchElementException;
@Service
@RequiredArgsConstructor
public class CustomAuthenticationHandler implements AuthenticationSuccessHandler {

    @Value("${app.url}")
    private String appUrl;

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var principle = (OAuth2User) authentication.getPrincipal();
        String id = principle.getAttributes().get("sub").toString();
        User user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("no User found"));
        if (!user.isNewUser()) {
            response.sendRedirect( appUrl);
        } else {
            user.setNewUser(false);
            userRepository.save(user);
            response.sendRedirect( appUrl + "/complete-profile");
        }

    }
}
