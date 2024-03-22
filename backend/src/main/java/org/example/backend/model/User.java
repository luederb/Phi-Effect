package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class User {
    private String sub;
    private String name;
    private String given_name;
    private String family_name;
    private String email;
    private String picture;
}

