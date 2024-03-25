package org.example.backend.security;

import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.CustomAuthenticationHandler;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class SecurityConfigTest {

    @Mock
    private HttpSecurity httpSecurity;

    @Test
    void testSecurityFilterChain() throws Exception {
        // Given
        SecurityConfig securityConfig = new SecurityConfig(null, null);

        // When
        SecurityFilterChain securityFilterChain = securityConfig.securityFilterChain(httpSecurity);

        // Then
        verify(httpSecurity).csrf().disable();
        verify(httpSecurity).sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
        verify(httpSecurity).exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
        verify(httpSecurity).authorizeHttpRequests().requestMatchers(HttpMethod.GET, "/api/users/me").authenticated();
        verify(httpSecurity).authorizeHttpRequests().anyRequest().permitAll();
        verify(httpSecurity).logout().logoutUrl("/api/user/logout");
        verify(httpSecurity).logout().logoutSuccessHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK));

        // Additional verifications can be added based on the specific requirements of the SecurityConfig class
    }

    // Add more test methods for other functionalities of the SecurityConfig class if needed

}
