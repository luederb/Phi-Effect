package org.example.backend.repository;

import org.example.backend.model.FriendRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {
    @Query("{ 'receiver._id' : ?0 }")
    List<FriendRequest> findByReceiverId(String receiverId);
    @Query("{ 'sender._id' : ?0 }")
    List<FriendRequest> findBySenderId(String senderId);
}
