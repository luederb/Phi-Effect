package org.example.backend.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

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
    @Test
    void testEqualsAndHashCode() {
        FriendRequest friendRequest1 = new FriendRequest();
        friendRequest1.setId("1");

        FriendRequest friendRequest2 = new FriendRequest();
        friendRequest2.setId("1");

        assertEquals(friendRequest1, friendRequest2);
        assertEquals(friendRequest1.hashCode(), friendRequest2.hashCode());

        friendRequest2.setId("2");

        assertNotEquals(friendRequest1, friendRequest2);
        assertNotEquals(friendRequest1.hashCode(), friendRequest2.hashCode());
    }

    @Test
    void testToString() {
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setId("1");

        String expected = "FriendRequest(id=1, sender=null, receiver=null, status=null)";
        assertEquals(expected, friendRequest.toString());
    }
    @Test
    void testSetStatus() {
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setStatus("accepted");

        assertEquals("accepted", friendRequest.getStatus());

        friendRequest.setStatus("rejected");

        assertEquals("rejected", friendRequest.getStatus());
    }

}