package org.example.backend;

import org.example.backend.repository.UserRepository;
import org.example.backend.security.SecurityConfig;
import org.example.backend.security.UserAuthController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplicationIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private final UserRepository userRepository;

    public ApplicationIntegrationTest(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Test
    public void whenUserAlreadyExists_thenConflict() {
        // Assuming you have a UserRegistrationRequest class and a /register endpoint
        SecurityConfig newUser = new SecurityConfig(userRepository);

        // First registration should pass
        ResponseEntity<String> responseEntity1 = restTemplate.postForEntity("api/auth", newUser, String.class);
        assertEquals(HttpStatus.OK, responseEntity1.getStatusCode());

        // Second registration with same username should fail
        ResponseEntity<String> responseEntity2 = restTemplate.postForEntity("api/auth", newUser, String.class);
        assertEquals(HttpStatus.CONFLICT, responseEntity2.getStatusCode());
    }
}
