package org.example.backend.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class AttributeUtils {

    private AttributeUtils() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(AttributeUtils.class);

    public static String getStringAttribute(Map<String, Object> attributes, String key) {
        if (!attributes.containsKey(key)) {
            LOGGER.error("Missing attribute: {}", key);
            throw new IllegalArgumentException("Missing attribute: " + key);
        }
        Object value = attributes.get(key);
        if (!(value instanceof String)) {
            LOGGER.error("Expected a String for attribute: {}", key);
            throw new IllegalArgumentException("Expected a String for attribute: " + key);
        }
        if (((String) value).isEmpty()) {
            LOGGER.error("Attribute {} cannot be empty", key);
            throw new IllegalArgumentException("Invalid attribute value: name");
        }
        return (String) value;
    }
}