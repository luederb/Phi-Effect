package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User saveUser(User user) {
        userRepository.save(user);
        return userRepository.findById(user.getId()).orElseThrow();
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }
}
