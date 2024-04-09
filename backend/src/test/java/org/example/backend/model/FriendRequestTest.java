package org.example.backend.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FriendRequestTest {

    @Test
    void testFriendRequest() {
        User sender = new User();
        sender.setId("1");
        sender.setName("Sender");

        User receiver = new User();
        receiver.setId("2");
        receiver.setName("Receiver");

        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setId("1");
        friendRequest.setSender(sender);
        friendRequest.setReceiver(receiver);
        friendRequest.setStatus("pending");

        assertEquals("1", friendRequest.getId());
        assertEquals(sender, friendRequest.getSender());
        assertEquals(receiver, friendRequest.getReceiver());
        assertEquals("pending", friendRequest.getStatus());
    }
}