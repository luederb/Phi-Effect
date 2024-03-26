package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import static org.example.backend.util.AttributeUtils.getStringAttribute;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private static final Logger LOGGER = LoggerFactory.getLogger(User.class);
    private String id;
    private String name;
    private String givenName;
    private String familyName;
    private String email;
    private String picture;
    private boolean isNewUser;

    public User(Map<String, Object> attributes) {
        LOGGER.info("Creating User with attributes: {}", attributes);
        if (attributes == null) {
            LOGGER.error("Attributes cannot be null");
            throw new IllegalArgumentException("Attributes cannot be null");
        }
        this.id = getStringAttribute(attributes, "sub");
        this.name = getStringAttribute(attributes, "name");
        this.givenName = getStringAttribute(attributes, "given_name");
        this.familyName = getStringAttribute(attributes, "family_name");
        this.email = getStringAttribute(attributes, "email");
        this.picture = getStringAttribute(attributes, "picture");
        this.isNewUser = true;
    }
}