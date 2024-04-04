package org.example.backend.repository;

import org.example.backend.model.Project;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;

import static com.mongodb.internal.connection.tlschannel.util.Util.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class ProjectRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    @DisplayName("Should find all projects")
    void shouldFindAllProjects() {
        Project project = new Project();
        entityManager.persistAndFlush(project);

        List<Project> projects = projectRepository.findAll();

        assertEquals(1, projects.size());
    }

    @Test
    @DisplayName("Should return empty list when there are no projects")
    void shouldReturnEmptyListWhenNoProjects() {

        List<Project> projects = projectRepository.findAll();

        assertTrue(projects.isEmpty());
    }
}