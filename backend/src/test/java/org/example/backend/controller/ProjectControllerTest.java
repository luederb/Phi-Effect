package org.example.backend.controller;

import org.example.backend.model.GpsCoordinates;
import org.example.backend.model.Project;
import org.example.backend.service.ProjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProjectService projectService;

    @Test
    void getProjectByIdTest() throws Exception {
        Project project = new Project();
        project.setId("1");
        project.setName("Test Project");
        project.setProjectOwner("John Doe");
        project.setCity("New York");
        project.setDescription("This is a test project");
        project.setGenre("Software Development");
        project.setStatus("In Progress");
        project.setGpsCoordinates(new GpsCoordinates(40.7128, 74.0060));
        project.setProjectStart("2021-01-01");
        project.setProjectEnd("2021-12-31");

        when(projectService.getProjectById("1")).thenReturn(project);

        mockMvc.perform(get("/api/projects/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }
}