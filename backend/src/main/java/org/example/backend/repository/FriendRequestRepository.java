package org.example.backend.repository;

import org.example.backend.model.FriendRequest;
import org.example.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {
    List<FriendRequest> findByReceiverAndStatus(User receiver, String status);
}
