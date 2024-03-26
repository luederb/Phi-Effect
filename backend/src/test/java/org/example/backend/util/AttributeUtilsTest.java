package org.example.backend.util;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.example.backend.util.AttributeUtils.getStringAttribute;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AttributeUtilsTest {

    @Test
    void testGetStringAttribute() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", "John Doe");

        String result = getStringAttribute(attributes, "name");

        assertEquals("John Doe", result);
    }
    @Test
    void testGetStringAttributeWithMissingAttribute() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", "John Doe");

        assertThrows(IllegalArgumentException.class, () -> getStringAttribute(attributes, "missingAttribute"));
    }
}