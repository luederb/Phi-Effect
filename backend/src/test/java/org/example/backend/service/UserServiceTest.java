package org.example.backend.service;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    void getUserTest() {
        User user = new User();
        user.setId("1");
        user.setName("Test User");

        userRepository.save(user);

        User foundUser = userService.getUserById("1");

        assertEquals("1", foundUser.getId());
        assertEquals("Test User", foundUser.getName());
    }

    @Test
    void saveUserTest() {
        User user = new User();
        user.setId("1");
        user.setName("Test User");

        userService.saveUser(user);

        Optional<User> savedUserOptional = userRepository.findById("1");

        assertTrue(savedUserOptional.isPresent());

        User savedUser = savedUserOptional.get();

        assertEquals("1", savedUser.getId());
        assertEquals("Test User", savedUser.getName());
    }

    @Test
    void deleteUserByIdTest() {
        String userId = "1";

        User user = new User();
        user.setId(userId);
        user.setName("Test User");

        userRepository.save(user);

        userService.deleteUserById(userId);

        assertTrue(userRepository.findById(userId).isEmpty());
    }

    @Test
    void addFavoriteProjectTest() {
        User user = new User();
        user.setId("1");
        user.setName("Test User");
        user.setFavoriteProjects(new ArrayList<>()); // Initialize the list

        userRepository.save(user);

        userService.addFavoriteProject(user, "1");

        User updatedUser = userRepository.findById("1").orElseThrow();

        assertTrue(updatedUser.getFavoriteProjects().contains("1"));
    }

    @Test
    void removeFavoriteProjectTest() {
        User user = new User();
        user.setId("1");
        user.setName("Test User");
        user.setFavoriteProjects(new ArrayList<>()); // Initialize the list
        user.getFavoriteProjects().add("1");

        userRepository.save(user);

        userService.removeFavoriteProject(user, "1");

        User updatedUser = userRepository.findById("1").orElseThrow();

        assertFalse(updatedUser.getFavoriteProjects().contains("1"));
    }
}