package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exceptions.UserAlreadyExistsException;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repo;

    public User saveUser(User user) {

        if (user == null || user.getSub() == null) {
            throw new IllegalArgumentException("User or User ID must not be null");
        }

        if (repo.findById(user.getSub()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists with ID: " + user.getSub());
        }
        return repo.save(user);
    }

}
