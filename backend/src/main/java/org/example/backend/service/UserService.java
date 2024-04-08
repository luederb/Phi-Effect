package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User saveUser(User user) {
        User savedUser = userRepository.save(user);
        return userRepository.findById(savedUser.getId()).orElseThrow();
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public User addFavoriteProject(User user, String projectId) {
        User existingUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        if(existingUser.getFavoriteProjects().contains(projectId)) {
            LOGGER.info("Project already in favorites: {}", projectId);
            return existingUser;
        }
        existingUser.getFavoriteProjects().add(projectId);
        userRepository.save(existingUser);
        return existingUser;
    }

    public User removeFavoriteProject(User user, String projectId) {
        User existingUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        if(!existingUser.getFavoriteProjects().contains(projectId)) {
            LOGGER.info("Project not in favorites: {}", projectId);
            return existingUser;
        }
        existingUser.getFavoriteProjects().remove(projectId);
        userRepository.save(existingUser);
        return existingUser;
    }
}
