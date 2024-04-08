package org.example.backend.controller;

import org.springframework.security.test.context.support.WithMockUser;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void getUserByIdTest() throws Exception {
        User user = new User();
        user.setId("1");
        user.setName("Test User");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@gmail.com");
        user.setPhone(1234567890);
        user.setBio("I am a software engineer");
        user.setPicture("https://example.com/john.jpg");
        user.setNewUser(false);

        when(userService.getUserById("1")).thenReturn(user);

        mockMvc.perform(get("/api/users/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }
    @Test
    @WithMockUser
    void deleteUserTest() throws Exception {
        doNothing().when(userService).deleteUserById("1");

        mockMvc.perform(delete("/api/users/1"))
                .andExpect(status().isOk());

        verify(userService, times(1)).deleteUserById("1");
    }

    @Test
    @WithMockUser
    void updateUserByIdTest() throws Exception {
        User user = new User();
        user.setId("1");
        user.setName("Updated User");

        when(userService.saveUser(user)).thenReturn(user);
        mockMvc.perform(put("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":\"1\",\"name\":\"Updated User\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Updated User"));

        verify(userService, times(1)).saveUser(user);
    }
}