package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Friend;
import org.example.backend.model.FriendRequest;
import org.example.backend.model.User;
import org.example.backend.repository.FriendRequestRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    public static final String STATUS_PENDING = "pending";
    public static final String STATUS_ACCEPTED = "accepted";
    public static final String STATUS_REJECTED = "rejected";

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
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

    private final FriendRequestRepository friendRequestRepository;

    public FriendRequest sendFriendRequest(User sender, User receiver) {
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setSender(sender);
        friendRequest.setReceiver(receiver);
        friendRequest.setStatus(STATUS_PENDING);
        return friendRequestRepository.save(friendRequest);
    }

    public User acceptFriendRequest(User user, String requestId) {
        FriendRequest friendRequest = friendRequestRepository.findById(requestId).orElseThrow();
        if (!friendRequest.getStatus().equals(STATUS_PENDING)) {
            throw new IllegalStateException("Cannot accept a non-pending friend request");
        }
        friendRequest.setStatus(STATUS_ACCEPTED);
        friendRequestRepository.save(friendRequest); // Save the updated friendRequest
        User sender = friendRequest.getSender();
        User receiver = friendRequest.getReceiver();
        Friend friendForSender = new Friend(receiver.getId(), receiver.getName(), receiver.getFirstName(), receiver.getLastName(), receiver.getEmail(), receiver.getPhone(), receiver.getBio(), receiver.getPicture(), receiver.getFavoriteProjects());
        Friend friendForReceiver = new Friend(sender.getId(), sender.getName(), sender.getFirstName(), sender.getLastName(), sender.getEmail(), sender.getPhone(), sender.getBio(), sender.getPicture(), sender.getFavoriteProjects());
        sender.getFriends().add(friendForSender); // Changed to receiver
        receiver.getFriends().add(friendForReceiver); // Changed to sender
        userRepository.save(sender);
        userRepository.save(receiver);
        return user.getId().equals(sender.getId()) ? sender : receiver;
    }

    public User rejectFriendRequest(User user, String requestId) {
        FriendRequest friendRequest = friendRequestRepository.findById(requestId).orElseThrow();
        if (!friendRequest.getStatus().equals(STATUS_PENDING)) {
            throw new IllegalStateException("Cannot reject a non-pending friend request");
        }
        friendRequest.setStatus(STATUS_REJECTED);
        friendRequestRepository.save(friendRequest);
        return user;
    }

    public List<FriendRequest> getSentFriendRequestsForCurrentUser(User user) {
    return friendRequestRepository.findBySender(user);
    }

    public List<FriendRequest> getReceivedFriendRequestsForCurrentUser(User user) {
        return friendRequestRepository.findByReceiver(user);
    }

    public List<User> getFriends(User user) {
        List<User> friends = new ArrayList<>();
        for (Friend friend : user.getFriends()) {
            friends.add(userRepository.findById(friend.getId()).orElseThrow());
        }
        return friends;
    }


}
