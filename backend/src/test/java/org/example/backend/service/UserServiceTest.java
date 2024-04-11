package org.example.backend.service;

import org.example.backend.model.Friend;
import org.example.backend.model.FriendRequest;
import org.example.backend.model.Status;
import org.example.backend.model.User;
import org.example.backend.repository.FriendRequestRepository;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceTest {
    @MockBean
    private FriendRequestRepository friendRequestRepository;

    private User user1;
    private User user2;
    private FriendRequest friendRequest;

    @BeforeEach
    void setUp() {
        user1 = new User();
        user1.setId("1");
        user1.setName("Test User 1");

        user2 = new User();
        user2.setId("2");
        user2.setName("Test User 2");

        friendRequest = new FriendRequest();
        friendRequest.setId("1");
        friendRequest.setSender(user1);
        friendRequest.setReceiver(user2);
        friendRequest.setStatus(Status.PENDING);
    }

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    void getUserTest() {
        when(userRepository.save(any(User.class))).thenReturn(user1);
        when(userRepository.findById("1")).thenReturn(Optional.of(user1));

        User foundUser = userService.getUserById("1");

        assertEquals("1", foundUser.getId());
        assertEquals("Test User 1", foundUser.getName());
    }

    @Test
    void saveUserTest() {
        when(userRepository.save(any(User.class))).thenReturn(user1);
        when(userRepository.findById("1")).thenReturn(Optional.of(user1));

        userService.saveUser(user1);

        Optional<User> savedUserOptional = userRepository.findById("1");

        assertTrue(savedUserOptional.isPresent());

        User savedUser = savedUserOptional.get();

        assertEquals("1", savedUser.getId());
        assertEquals("Test User 1", savedUser.getName());
    }

    @Test
    void deleteUserByIdTest() {
        userRepository.save(user1);

        userService.deleteUserById(user1.getId());

        assertTrue(userRepository.findById(user1.getId()).isEmpty());
    }

    @Test
    void addFavoriteProjectTest() {

        user1.setFavoriteProjects(new ArrayList<>()); // Initialize the list

        when(userRepository.save(any(User.class))).thenReturn(user1);
        when(userRepository.findById("1")).thenReturn(Optional.of(user1));

        userService.addFavoriteProject(user1, "1");

        User updatedUser = userRepository.findById("1").orElseThrow();

        assertTrue(updatedUser.getFavoriteProjects().contains("1"));
    }

    @Test
    void removeFavoriteProjectTest() {
        user1.setFavoriteProjects(new ArrayList<>()); // Initialize the list
        user1.getFavoriteProjects().add("1");

        when(userRepository.save(any(User.class))).thenReturn(user1);
        when(userRepository.findById("1")).thenReturn(Optional.of(user1));

        userService.removeFavoriteProject(user1, "1");

        User updatedUser = userRepository.findById("1").orElseThrow();

        assertFalse(updatedUser.getFavoriteProjects().contains("1"));
    }

    @Test
    void getAllUsersTest() {
        List<User> users = new ArrayList<>();
        users.add(user1);
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
    @Test
    void sendFriendRequestTest() {
        when(userRepository.save(any(User.class))).thenReturn(user1, user2);
        when(friendRequestRepository.save(any(FriendRequest.class))).thenReturn(friendRequest);

        FriendRequest result = userService.sendFriendRequest(user1, user2);

        assertEquals(user1.getId(), result.getSender().getId());
        assertEquals(user2.getId(), result.getReceiver().getId());
        assertEquals(friendRequest.getId(), result.getId());
        assertEquals(Status.PENDING, result.getStatus());
    }

    @Test
    void testAcceptFriendRequest() {
        when(friendRequestRepository.findById("1")).thenReturn(Optional.of(friendRequest));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        userService.acceptFriendRequest(user1, "1");

        assertEquals(Status.ACCEPTED, friendRequest.getStatus());
        assertTrue(user1.getFriends().stream().anyMatch(f -> f.getId().equals(user2.getId())));
    }

    @Test
    void testRejectFriendRequest() {
        when(friendRequestRepository.findById("1")).thenReturn(Optional.of(friendRequest));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        userService.rejectFriendRequest(user1, "1");

        assertEquals(Status.REJECTED, friendRequest.getStatus());
    }

    @Test
    void testGetSentFriendRequestsForCurrentUser() {
        when(friendRequestRepository.findBySenderId("1")).thenReturn(Collections.singletonList(friendRequest));

        List<FriendRequest> friendRequests = userService.getSentFriendRequestsForCurrentUser("1");

        assertEquals(1, friendRequests.size());
        assertEquals("1", friendRequests.getFirst().getId());
    }

    @Test
    void testGetReceivedFriendRequestsForCurrentUser() {
        when(friendRequestRepository.findByReceiverId("1")).thenReturn(Collections.singletonList(friendRequest));

        List<FriendRequest> friendRequests = userService.getReceivedFriendRequestsForCurrentUser("1");

        assertEquals(1, friendRequests.size());
        assertEquals("1", friendRequests.getFirst().getId());
    }

    @Test
    void testRemoveFriend() {
        user1.getFriends().add(new Friend(user2.getId(), user2.getName(), user2.getFirstName(), user2.getLastName(), user2.getEmail(), user2.getPhone(), user2.getBio(), user2.getPicture(), user2.getFavoriteProjects()));
        when(userRepository.findById("1")).thenReturn(Optional.of(user1));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        userService.removeFriend(user1, user2);

        assertFalse(user1.getFriends().stream().anyMatch(f -> f.getId().equals(user2.getId())));
    }

    @Test
    void getFriendsTest() {
        when(userRepository.save(any(User.class))).thenReturn(user1);
        when(userRepository.findById(anyString())).thenReturn(Optional.of(user2));

        user1.setFriends(List.of(new Friend(user2.getId(), user2.getName(), user2.getFirstName(), user2.getLastName(), user2.getEmail(), user2.getPhone(), user2.getBio(), user2.getPicture(), user2.getFavoriteProjects())));

        List<User> result = userService.getFriends(user1);

        assertEquals(1, result.size());
        assertEquals(user2.getId(), result.getFirst().getId());
        assertEquals(user2.getName(), result.getFirst().getName());
    }
}