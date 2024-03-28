package org.example.backend.service;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    void getUserTest() {
        User user = new User();
        user.setId("1");
        user.setName("Test User");

        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        User foundUser = userService.getUserById("1");

        assertEquals("1", foundUser.getId());
        assertEquals("Test User", foundUser.getName());
    }
    @Test
    void saveUserTest() {
        User user = new User();
        user.setId("1");
        user.setName("Test User");

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        User savedUser = userService.saveUser(user);

        assertEquals("1", savedUser.getId());
        assertEquals("Test User", savedUser.getName());
    }

    @Test
    void deleteUserByIdTest() {
        String userId = "1";
        doNothing().when(userRepository).deleteById(userId);
        userService.deleteUserById(userId);
        verify(userRepository, times(1)).deleteById(userId);
    }
}