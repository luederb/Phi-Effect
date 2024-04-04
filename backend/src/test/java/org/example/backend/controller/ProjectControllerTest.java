package org.example.backend.controller;

import org.example.backend.model.Project;
import org.example.backend.service.ProjectService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProjectService projectService;

    @Test
    @DisplayName("Should return 200 when getting all projects")
    void shouldReturn200WhenGetAllProjects() throws Exception {
        when(projectService.getAllProjects()).thenReturn(Collections.singletonList(new Project()));

        mockMvc.perform(get("/projects"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Should return 200 and empty list when there are no projects")
    void shouldReturn200AndEmptyListWhenNoProjects() throws Exception {
        when(projectService.getAllProjects()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/projects"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}