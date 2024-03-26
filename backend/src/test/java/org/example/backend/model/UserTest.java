package org.example.backend.model;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.example.backend.util.AttributeUtils.getStringAttribute;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testConstructorWithValidAttributes() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", "123");
        attributes.put("name", "John Doe");
        attributes.put("given_name", "John");
        attributes.put("family_name", "Doe");
        attributes.put("email", "john.doe@example.com");
        attributes.put("picture", "https://example.com/john.jpg");

        User user = new User(attributes);

        assertEquals("123", user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("john.doe@example.com", user.getEmail());
        assertEquals("https://example.com/john.jpg", user.getPicture());
        assertTrue(user.isNewUser());
    }

    @Test
    void testConstructorWithInvalidAttributes() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", "123");
        attributes.put("name", "");
        attributes.put("given_name", "John");
        attributes.put("family_name", "Doe");
        attributes.put("email", "john.doe@example.com");
        attributes.put("picture", "https://example.com/john.jpg");

        Exception exception = assertThrows(IllegalArgumentException.class, () -> new User(attributes));

        String expectedMessage = "Invalid attribute value: name";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    void testConstructorWithNullAttributes() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> new User(null));

        String expectedMessage = "Attributes cannot be null";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    void testConstructorWithMissingAttributes() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", "123");
        attributes.put("given_name", "John");
        attributes.put("family_name", "Doe");
        attributes.put("email", "john.doe@example.com");
        attributes.put("picture", "https://example.com/john.jpg");

        Exception exception = assertThrows(IllegalArgumentException.class, () -> new User(attributes));

        String expectedMessage = "Missing attribute: name";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    void testGettersAndSetters() {
        User user = new User();
        user.setId("123");
        user.setName("John Doe");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setPicture("https://example.com/john.jpg");
        user.setNewUser(true);

        assertEquals("123", user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("john.doe@example.com", user.getEmail());
        assertEquals("https://example.com/john.jpg", user.getPicture());
        assertTrue(user.isNewUser());
    }

    @Test
    void testEqualsAndHashCode() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", "123");
        attributes.put("name", "John Doe");
        attributes.put("given_name", "John");
        attributes.put("family_name", "Doe");
        attributes.put("email", "john.doe@example.com");
        attributes.put("picture", "https://example.com/john.jpg");

        User user1 = new User(attributes);
        User user2 = new User(attributes);

        assertTrue(user1.equals(user2) && user2.equals(user1));
        assertEquals(user1.hashCode(), user2.hashCode());

        // Change an attribute
        user2.setName("Jane Doe");
        assertFalse(user1.equals(user2) || user2.equals(user1));
        assertNotEquals(user1.hashCode(), user2.hashCode());
    }
    @Test
    void testGetStringAttributeWithMissingAttribute() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", "John Doe");

        assertThrows(IllegalArgumentException.class, () -> getStringAttribute(attributes, "missingAttribute"));
    }
}