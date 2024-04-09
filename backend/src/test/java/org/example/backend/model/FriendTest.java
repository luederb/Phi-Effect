package org.example.backend.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FriendTest {

    @Test
    void testFriend() {
        Friend friend = new Friend();
        friend.setId("1");
        friend.setName("Test Friend");

        assertEquals("1", friend.getId());
        assertEquals("Test Friend", friend.getName());
    }
}