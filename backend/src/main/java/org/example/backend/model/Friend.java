package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Friend {
    private String id;
    private String name;
    private String firstName;
    private String lastName;
    private String email;
    private Number phone;
    private String bio;
    private String picture;
    private List<String> favoriteProjects;
}
