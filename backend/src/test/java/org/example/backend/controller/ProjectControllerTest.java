package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProjectService projectService;
    @Test
    void getAllProjectsTest() throws Exception {
        Project mockProject1 = new Project();
        mockProject1.setId("1");
        Project mockProject2 = new Project();
        mockProject2.setId("2");
        when(projectService.getAllProjects()).thenReturn(Arrays.asList(mockProject1, mockProject2));

        mockMvc.perform(get("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[1].id").value("2"));
    }

    @Test
    void saveNewProjectTest() throws Exception {
        Project mockProject = new Project();
        mockProject.setId("1");
        when(projectService.saveNewProject(any(Project.class))).thenReturn(mockProject);

        Project newProject = new Project();
        ObjectMapper mapper = new ObjectMapper();
        String newProjectAsJson = mapper.writeValueAsString(newProject);

        mockMvc.perform(post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newProjectAsJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"));
    }
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
        Calendar calendar = Calendar.getInstance();

        calendar.set(2024, Calendar.JANUARY, 1);
        Date startDate = calendar.getTime();
        project.setProjectStart(startDate);

        calendar.set(2024, Calendar.DECEMBER, 31);
        Date endDate = calendar.getTime();
        project.setProjectEnd(endDate);

        when(projectService.getProjectById("1")).thenReturn(project);

        mockMvc.perform(get("/api/projects/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

}