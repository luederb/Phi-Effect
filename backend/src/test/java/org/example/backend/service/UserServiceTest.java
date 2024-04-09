package org.example.backend.service;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
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

        when(userRepository.save(any(User.class))).thenReturn(user);
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

        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userRepository.findById("1")).thenReturn(Optional.of(user));

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

        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userRepository.findById("1")).thenReturn(Optional.of(user));

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

        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        userService.removeFavoriteProject(user, "1");

        User updatedUser = userRepository.findById("1").orElseThrow();

        assertFalse(updatedUser.getFavoriteProjects().contains("1"));
    }

    @Test
    void getAllUsersTest() {
        List<User> users = new ArrayList<>();

        User user1 = new User();
        user1.setId("1");
        user1.setName("Test User 1");
        users.add(user1);

        User user2 = new User();
        user2.setId("2");
        user2.setName("Test User 2");
        users.add(user2);

        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        System.out.println("Users list size: " + users.size()); // Debug print
        System.out.println("Result list size: " + result.size()); // Debug print

        assertEquals(2, result.size());
        assertEquals("1", result.get(0).getId());
        assertEquals("Test User 1", result.get(0).getName());
        assertEquals("2", result.get(1).getId());
        assertEquals("Test User 2", result.get(1).getName());

        verify(userRepository, times(1)).findAll();
    }
}