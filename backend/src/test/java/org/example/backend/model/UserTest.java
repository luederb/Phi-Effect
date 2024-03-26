package org.example.backend.model;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

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
        assertEquals("John", user.getGivenName());
        assertEquals("Doe", user.getFamilyName());
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
        user.setGivenName("John");
        user.setFamilyName("Doe");
        user.setEmail("john.doe@example.com");
        user.setPicture("https://example.com/john.jpg");
        user.setNewUser(true);

        assertEquals("123", user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals("John", user.getGivenName());
        assertEquals("Doe", user.getFamilyName());
        assertEquals("john.doe@example.com", user.getEmail());
        assertEquals("https://example.com/john.jpg", user.getPicture());
        assertTrue(user.isNewUser());
    }
}