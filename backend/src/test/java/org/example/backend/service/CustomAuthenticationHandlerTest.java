package org.example.backend.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;
@SpringBootTest
class CustomAuthenticationHandlerTest {

    @Value("${APP_URL}")
    private String appUrl;
    @Mock
    private UserRepository userRepository;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private Authentication authentication;

    @Mock
    private OAuth2User principal;

    @Mock
    private HttpSession session;

    private CustomAuthenticationHandler customAuthenticationHandler;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        customAuthenticationHandler = new CustomAuthenticationHandler(userRepository);
        ReflectionTestUtils.setField(customAuthenticationHandler, "appUrl", appUrl);
    }

    @Test
    void testOnAuthenticationSuccessWhenUserIsNew() throws Exception {
        User user = new User();
        user.setId("123");
        user.setNewUser(true);

        when(authentication.getPrincipal()).thenReturn(principal);
        when(principal.getAttributes()).thenReturn(Map.of("sub", "123"));
        when(userRepository.findById("123")).thenReturn(Optional.of(user));
        when(request.getSession()).thenReturn(session);

        customAuthenticationHandler.onAuthenticationSuccess(request, response, authentication);

        verify(session).setAttribute("userId", user.getId());
        verify(userRepository).save(user);
        verify(response).sendRedirect(endsWith("/complete-profile"));
    }

    @Test
    void testOnAuthenticationSuccessWhenUserIsNotNew() throws Exception {
        // Arrange
        User user = new User();
        user.setId("123");
        user.setNewUser(false); // User is not new

        when(authentication.getPrincipal()).thenReturn(principal);
        when(principal.getAttributes()).thenReturn(Map.of("sub", "123"));
        when(userRepository.findById("123")).thenReturn(Optional.of(user));
        when(request.getSession()).thenReturn(session);

        // Act
        customAuthenticationHandler.onAuthenticationSuccess(request, response, authentication);

        // Assert
        verify(session).setAttribute("userId", user.getId());
        verify(userRepository, never()).save(any(User.class)); // User is not saved
        verify(response).sendRedirect(appUrl + "/home"); // Redirect to exact URL
    }
}