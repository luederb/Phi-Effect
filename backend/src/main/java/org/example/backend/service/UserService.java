package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserService {

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
        if (user.getFavoriteProjects() == null) {
            user.setFavoriteProjects(new ArrayList<>());
        }
        user.getFavoriteProjects().add(projectId);
        userRepository.save(user);
        return user;
    }

    public User removeFavoriteProject(User user, String projectId) {
        if (user.getFavoriteProjects() != null) {
            user.getFavoriteProjects().remove(projectId);
            userRepository.save(user);
        }
        return user;
    }
}
