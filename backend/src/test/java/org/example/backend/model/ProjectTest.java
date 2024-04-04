package org.example.backend.model;

import org.junit.jupiter.api.Test;


import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ProjectTest {

    @Test
    void testSetAndGetId() {
        Project project = new Project();
        project.setId("1");
        assertEquals("1", project.getId());
    }

    @Test
    void testSetAndGetName() {
        Project project = new Project();
        project.setName("Test Project");
        assertEquals("Test Project", project.getName());
    }

    @Test
    void testSetAndGetProjectOwner() {
        Project project = new Project();
        project.setProjectOwner("Test Owner");
        assertEquals("Test Owner", project.getProjectOwner());
    }
    @Test
    void testSetAndGetDescription() {
        Project project = new Project();
        project.setDescription("Test Description");
        assertEquals("Test Description", project.getDescription());
    }

    @Test
    void testSetAndGetGenre() {
        Project project = new Project();
        project.setGenre("Test Genre");
        assertEquals("Test Genre", project.getGenre());
    }

    @Test
    void testSetAndGetStatus() {
        Project project = new Project();
        project.setStatus("Test Status");
        assertEquals("Test Status", project.getStatus());
    }

    @Test
    void testSetAndGetProjectStart() {
        Project project = new Project();
        Date startDate = new Date();
        project.setProjectStart(startDate);
        assertEquals(startDate, project.getProjectStart());
    }

    @Test
    void testSetAndGetProjectEnd() {
        Project project = new Project();
        Date endDate = new Date();
        project.setProjectEnd(endDate);
        assertEquals(endDate, project.getProjectEnd());
    }
}