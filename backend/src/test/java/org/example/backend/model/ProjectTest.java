package org.example.backend.model;

import org.junit.jupiter.api.Test;


import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
        Project project = new Project("1", "Test Project", "Test Owner", "Test City", "Test Description", "Test Genre", "Test Status", new GpsCoordinates(40.7128, 74.0060), new Date(), new Date());
        Date endDate = new Date();
        project.setProjectEnd(endDate);
        assertEquals(endDate, project.getProjectEnd());
    }

    @Test
    void testEqualsAndHashCode() {
        Date date = new Date();
        Project project1 = new Project("1", "Test Project", "Test Owner", "Test City", "Test Description", "Test Genre", "Test Status", new GpsCoordinates(40.7128, 74.0060), new Date(), new Date());
        Project project2 = new Project("1", "Test Project", "Test Owner", "Test City", "Test Description", "Test Genre", "Test Status", new GpsCoordinates(40.7128, 74.0060), date, date);

        assertTrue(project1.equals(project2) && project2.equals(project1));
        assertEquals(project1.hashCode(), project2.hashCode());
    }

    @Test
    void testToString() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(2022, Calendar.JANUARY, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startDate = calendar.getTime();

        calendar.set(2022, Calendar.DECEMBER, 31, 23, 59, 59);
        calendar.set(Calendar.MILLISECOND, 0);
        Date endDate = calendar.getTime();
        Project project = new Project();
        project.setId("1");
        project.setName("Test Project");
        project.setProjectOwner("Test Owner");
        project.setCity("Test City");
        project.setDescription("Test Description");
        project.setGenre("Test Genre");
        project.setStatus("Test Status");
        project.setGpsCoordinates(new GpsCoordinates(40.7128, 74.0060));
        project.setProjectStart(startDate);
        project.setProjectEnd(endDate);

        String expected = "Project(id=1, name=Test Project, projectOwner=Test Owner, city=Test City, description=Test Description, genre=Test Genre, status=Test Status, gpsCoordinates=GpsCoordinates(latitude=40.7128, longitude=74.0060), projectStart=" + startDate + ", projectEnd=" + endDate + ")";
        assertEquals(expected, project.toString());
    }

    @Test
    void testAllArgsConstructor() {
        Date date = new Date();
        Project project = new Project();
        project.setId("1");
        project.setName("Test Project");
        project.setProjectOwner("Test Owner");
        project.setDescription("Test Description");
        project.setGenre("Test Genre");
        project.setStatus("Test Status");
        project.setGpsCoordinates(new GpsCoordinates(40.7128, 74.0060));
        project.setProjectStart(date);
        project.setProjectEnd(date);

        assertEquals("1", project.getId());
        assertEquals("Test Project", project.getName());
        assertEquals("Test Owner", project.getProjectOwner());
        assertEquals("Test Description", project.getDescription());
        assertEquals("Test Genre", project.getGenre());
        assertEquals("Test Status", project.getStatus());
        assertEquals(new GpsCoordinates(40.7128, 74.0060), project.getGpsCoordinates());
        assertEquals(date, project.getProjectStart());
        assertEquals(date, project.getProjectEnd());
    }

    @Test
    void testBuilder() {
        Date date = new Date();
        Project project = Project.builder()
                .id("1")
                .name("Test Project")
                .projectOwner("Test Owner")
                .description("Test Description")
                .genre("Test Genre")
                .status("Test Status")
                .gpsCoordinates(new GpsCoordinates(40.7128, 74.0060))
                .projectStart(date)
                .projectEnd(date)
                .build();

        assertEquals("1", project.getId());
        assertEquals("Test Project", project.getName());
        assertEquals("Test Owner", project.getProjectOwner());
        assertEquals("Test Description", project.getDescription());
        assertEquals("Test Genre", project.getGenre());
        assertEquals("Test Status", project.getStatus());
        assertEquals(new GpsCoordinates(40.7128, 74.0060), project.getGpsCoordinates());
        assertEquals(date, project.getProjectStart());
        assertEquals(date, project.getProjectEnd());
    }
}