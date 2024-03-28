package org.example.backend.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.mongodb.assertions.Assertions.assertFalse;
import static org.mockito.Mockito.*;

class CustomAuthenticationHandlerTest {

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private Authentication authentication;

    @Mock
    private OAuth2User oAuth2User;

    @Mock
    private UserRepository userRepository;

    @Test
    void testOnAuthenticationSuccessWhenUserIsNew() throws Exception {
        try (AutoCloseable ignored = MockitoAnnotations.openMocks(this)) {

        CustomAuthenticationHandler customAuthenticationHandler = new CustomAuthenticationHandler(userRepository);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", "123");
        attributes.put("name", "John Doe");
        attributes.put("given_name", "John");
        attributes.put("family_name", "Doe");
        attributes.put("email", "lueder@gmail.com");
        attributes.put("phone", 1234567890);
        attributes.put("bio", "I am a software engineer");
        attributes.put("picture", "https://example.com/john.jpg");
        attributes.put("newUser", true);
        when(authentication.getPrincipal()).thenReturn(oAuth2User);
        when(oAuth2User.getAttributes()).thenReturn(attributes);

        User user = new User();
        user.setId("123");
        user.setName("John Doe");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("lueder@gmail.com");
        user.setPhone(1234567890);
        user.setBio("I am a software engineer");
        user.setPicture("https://example.com/john.jpg");
        user.setNewUser(true);

        when(userRepository.findById("123")).thenReturn(Optional.of(user));

        customAuthenticationHandler.onAuthenticationSuccess(request, response, authentication);

        verify(response).sendRedirect(anyString());
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();
        assertFalse(savedUser.isNewUser());
        }
    }

    @Test
    void testOnAuthenticationSuccessWhenUserIsNotNew() throws Exception {
        try (AutoCloseable ignored = MockitoAnnotations.openMocks(this)) {
            CustomAuthenticationHandler customAuthenticationHandler = new CustomAuthenticationHandler(userRepository);

            ReflectionTestUtils.setField(customAuthenticationHandler, "appUrl", "http://localhost:5173");

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("sub", "123");
            attributes.put("name", "John Doe");
            attributes.put("given_name", "John");
            attributes.put("family_name", "Doe");
            attributes.put("email", "lueder@gmail.com");
            attributes.put("phone", 1234567890);
            attributes.put("bio", "I am a software engineer");
            attributes.put("picture", "https://example.com/john.jpg");
            attributes.put("newUser", false);
            when(authentication.getPrincipal()).thenReturn(oAuth2User);
            when(oAuth2User.getAttributes()).thenReturn(attributes);

            User user = new User();
            user.setId("123");
            user.setName("John Doe");
            user.setFirstName("John");
            user.setLastName("Doe");
            user.setEmail("lueder@gmail.com");
            user.setPhone(1234567890);
            user.setBio("I am a software engineer");
            user.setPicture("https://example.com/john.jpg");
            user.setNewUser(true);

            when(userRepository.findById("123")).thenReturn(Optional.of(user));

            customAuthenticationHandler.onAuthenticationSuccess(request, response, authentication);

            verify(response).sendRedirect("http://localhost:5173/complete-profile");
            ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
            verify(userRepository).save(userCaptor.capture());
            User savedUser = userCaptor.getValue();
            assertFalse(savedUser.isNewUser());
        }
    }
}