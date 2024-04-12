package org.example.backend.controller;

import org.example.backend.model.Friend;
import org.example.backend.model.FriendRequest;
import org.example.backend.model.Status;
import org.example.backend.repository.FriendRequestRepository;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.example.backend.model.User;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.test.context.support.WithMockUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static com.mongodb.assertions.Assertions.assertFalse;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll(); // Clear the repository before each test
        friendRequestRepository.deleteAll(); // Clear the repository before each test

        User user = new User();
        user.setId("1");
        user.setName("Test User");
        userRepository.save(user);

        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setId("1");
        friendRequest.setSender(user);
        friendRequest.setReceiver(user);
        friendRequest.setStatus(Status.PENDING);
        friendRequestRepository.save(friendRequest);
    }


    @WithMockUser
    @Test
    void getUserByIdTest() throws Exception {
        mockMvc.perform(get("/api/users/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @WithMockUser
    @Test
    void deleteUserTest() throws Exception {
        mockMvc.perform(delete("/api/users/1"))
                .andExpect(status().isOk());
    }

    @WithMockUser
    @Test
    void updateUserByIdTest() throws Exception {
        mockMvc.perform(put("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":\"1\",\"name\":\"Updated User\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Updated User"));
    }

    @WithMockUser
    @Test
    void updateUserByIdTest_BadRequest() throws Exception {
        mockMvc.perform(put("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":\"2\",\"name\":\"Updated User\"}"))
                .andExpect(status().isBadRequest());
    }

    @WithMockUser
    @Test
    void getAllUsersTest() throws Exception {
        mockMvc.perform(get("/api/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1))) // Expect only 1 user
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].name").value("Test User"));
    }

    @WithMockUser
    @Test
    void testSendFriendRequest() throws Exception {
        User receiver = new User();
        receiver.setId("2");
        receiver.setName("Test User 2");
        userRepository.save(receiver);
        mockMvc.perform(post("/api/users/1/friendRequests")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":\"2\",\"name\":\"Test User 2\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sender.id").value("1"))
                .andExpect(jsonPath("$.receiver.id").value("2"));
    }
    @WithMockUser
    @Test
    void testGetFriends() throws Exception {
        mockMvc.perform(get("/api/users/1/friends")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    @WithMockUser
    @Test
    void testAcceptFriendRequest() throws Exception {
        mockMvc.perform(put("/api/users/1/friendRequests/1/accept")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Expect a 200 OK status
                .andExpect(jsonPath("$.id").value("1")) // Check if the returned user has the correct id
                .andExpect(jsonPath("$.name").value("Test User")); // Check if the returned user has the correct name

        // Fetch the friend request again to check its status
        FriendRequest friendRequest = friendRequestRepository.findById("1").orElse(null);
        assert friendRequest != null;
        assertEquals(Status.ACCEPTED, friendRequest.getStatus());
    }
    @WithMockUser
    @Test
    void testRejectFriendRequest() throws Exception {
        mockMvc.perform(put("/api/users/1/friendRequests/1/reject")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Expect a 200 OK status
                .andExpect(jsonPath("$.id").value("1")) // Check if the returned user has the correct id
                .andExpect(jsonPath("$.name").value("Test User")); // Check if the returned user has the correct name

        // Fetch the friend request again to check its status
        FriendRequest friendRequest = friendRequestRepository.findById("1").orElse(null);
        assert friendRequest != null;
        assertEquals(Status.REJECTED, friendRequest.getStatus());
    }
    @WithMockUser
    @Test
    void testGetSentFriendRequestsForCurrentUser() throws Exception {
        mockMvc.perform(get("/api/users/1/sentFriendRequestsForCurrentUser")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Expect a 200 OK status
                .andExpect(jsonPath("$", hasSize(1))) // Expect only 1 friend request
                .andExpect(jsonPath("$[0].id").value("1")) // Check if the returned friend request has the correct id
                .andExpect(jsonPath("$[0].sender.id").value("1")) // Check if the sender of the friend request has the correct id
                .andExpect(jsonPath("$[0].receiver.id").value("1")); // Check if the receiver of the friend request has the correct id
    }
    @WithMockUser
    @Test
    void testGetReceivedFriendRequestsForCurrentUser() throws Exception {
        mockMvc.perform(get("/api/users/1/receivedFriendRequestsForCurrentUser")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Expect a 200 OK status
                .andExpect(jsonPath("$", hasSize(1))) // Expect only 1 friend request
                .andExpect(jsonPath("$[0].id").value("1")) // Check if the returned friend request has the correct id
                .andExpect(jsonPath("$[0].sender.id").value("1")) // Check if the sender of the friend request has the correct id
                .andExpect(jsonPath("$[0].receiver.id").value("1")); // Check if the receiver of the friend request has the correct id
    }
    @WithMockUser
    @Test
    void testRemoveFriend() throws Exception {
        // Create a second user to be the friend
        User user1 = new User();
        user1.setId("2");
        user1.setName("Test Friend");
        userRepository.save(user1);

        // Convert the second user to be of type "Friend"
        Friend friend = new Friend(user1.getId(), user1.getName(), user1.getFirstName(), user1.getLastName(), user1.getEmail(), user1.getPhone(), user1.getBio(), user1.getPicture(), user1.getFavoriteProjects());

        // Add the friend to the user's friend list
        User user = userRepository.findById("1").orElse(null);
        assert user != null;
        user.getFriends().add(friend);
        userRepository.save(user);

        // Perform the remove friend request
        mockMvc.perform(delete("/api/users/1/friends/2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()); // Expect a 200 OK status

        // Fetch the user again to check if the friend has been removed
        user = userRepository.findById("1").orElse(null);
        assert user != null;
        assertFalse(user.getFriends().contains(friend));
    }
    @Test
    void testCheckIfUserIsLoggedInWhenUserIsLoggedIn() throws Exception {
        // Create a mock session and add the "userId" attribute
        MockHttpSession session = new MockHttpSession();
        session.setAttribute("userId", "1");

        // Create a mock request and set the session
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setSession(session);

        // Perform the request
        mockMvc.perform(get("/api/users/checkIfLoggedIn")
                        .session(session) // Set the mock session
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    void testCheckIfUserIsLoggedInWhenUserIsNotLoggedIn() throws Exception {
        // Perform the request without a session
        mockMvc.perform(get("/api/users/checkIfLoggedIn")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }

}