package org.example.backend.controller;

import org.example.backend.model.Project;
import org.example.backend.repository.ProjectRepository;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
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

import java.util.ArrayList;

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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setId("1");
        user.setName("Test User");
        user.setFavoriteProjects(new ArrayList<>()); // Initialize the list
        userRepository.save(user);

        Project project = new Project();
        project.setId("1");
        project.setName("Test Project");
        projectRepository.save(project);
    }
    @Test
    void getUserByIdTest() throws Exception {
        User user = new User();
        user.setId("1");
        user.setName("Test User");

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

    @Test
    @WithMockUser
    void updateUserByIdTest_BadRequest() throws Exception {
        User user = new User();
        user.setId("2");
        user.setName("Updated User");

        mockMvc.perform(put("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":\"2\",\"name\":\"Updated User\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void updateFavoriteProjectsOfUserTest_AddProject() throws Exception {
        User user = userRepository.findById("1").orElseThrow();

        User updatedUser = new User();
        updatedUser.setId(user.getId());
        updatedUser.setName(user.getName());
        updatedUser.setFavoriteProjects(new ArrayList<>(user.getFavoriteProjects()));
        updatedUser.getFavoriteProjects().add("1");

        when(userService.getUserById("1")).thenReturn(user);
        when(userService.addFavoriteProject(any(User.class), anyString())).thenReturn(updatedUser);

        mockMvc.perform(put("/api/users/1/updateFavoriteProjectsOfUser/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Test User"));

        verify(userService, times(1)).addFavoriteProject(any(User.class), anyString());
    }

    @Test
    @WithMockUser
    void updateFavoriteProjectsOfUserTest_RemoveProject() throws Exception {
        User user = userRepository.findById("1").orElseThrow();
        user.getFavoriteProjects().add("1");
        userRepository.save(user);

        User updatedUser = new User();
        updatedUser.setId(user.getId());
        updatedUser.setName(user.getName());
        updatedUser.setFavoriteProjects(new ArrayList<>(user.getFavoriteProjects()));
        updatedUser.getFavoriteProjects().remove("1");

        when(userService.getUserById("1")).thenReturn(user);
        when(userService.removeFavoriteProject(any(User.class), anyString())).thenReturn(updatedUser);

        mockMvc.perform(put("/api/users/1/updateFavoriteProjectsOfUser/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Test User"));

        verify(userService, times(1)).removeFavoriteProject(any(User.class), anyString());
    }
}