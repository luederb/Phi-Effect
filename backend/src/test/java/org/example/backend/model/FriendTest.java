package org.example.backend.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class FriendTest {

    @Test
    void testFriend() {
        Friend friend = new Friend();
        friend.setId("1");
        friend.setName("Test Friend");

        assertEquals("1", friend.getId());
        assertEquals("Test Friend", friend.getName());
    }
    @Test
    void testBuilder() {
        Friend friend = Friend.builder()
                .id("1")
                .name("John Doe")
                .build();

        assertEquals("1", friend.getId());
        assertEquals("John Doe", friend.getName());
    }

    @Test
    void testToString() {
        Friend friend = new Friend();
        friend.setId("1");
        friend.setName("John Doe");

        String expected = "Friend(id=1, name=John Doe, firstName=null, lastName=null, email=null, phone=null, bio=null, picture=null, favoriteProjects=null)";
        assertEquals(expected, friend.toString());
    }

    @Test
    void testEqualsAndHashCode() {
        Friend friend1 = new Friend();
        friend1.setId("1");
        friend1.setName("John Doe");

        Friend friend2 = new Friend();
        friend2.setId("1");
        friend2.setName("John Doe");

        assertEquals(friend1, friend2);
        assertEquals(friend1.hashCode(), friend2.hashCode());

        friend2.setId("2");

        assertNotEquals(friend1, friend2);
        assertNotEquals(friend1.hashCode(), friend2.hashCode());
    }
}