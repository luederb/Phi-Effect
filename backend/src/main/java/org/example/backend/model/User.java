package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private String id;
    private String name;
    private String givenName;
    private String familyName;
    private String email;
    private String picture;

    public User(Map<String, Object> attributes) {
        this.id = (String) attributes.get("sub");
        this.name = (String) attributes.get("name");
        this.givenName = (String) attributes.get("given_name");
        this.familyName = (String) attributes.get("family_name");
        this.email = (String) attributes.get("email");
        this.picture = (String) attributes.get("picture");
    }
}

