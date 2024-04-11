package org.example.backend.controller;

import org.example.backend.model.FriendRequest;
import org.example.backend.model.Status;
import org.example.backend.repository.FriendRequestRepository;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.example.backend.model.User;
import org.springframework.security.test.context.support.WithMockUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
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
    void testAcceptFriendRequest() throws Exception {
        mockMvc.perform(put("/api/users/1/friendRequests/1/accept")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Expect a 200 OK status
                .andExpect(jsonPath("$.id").value("1")) // Check if the returned user has the correct id
                .andExpect(jsonPath("$.name").value("Test User")); // Check if the returned user has the correct name
    }

    @WithMockUser
    @Test
    void testGetFriends() throws Exception {
        mockMvc.perform(get("/api/users/1/friends")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}