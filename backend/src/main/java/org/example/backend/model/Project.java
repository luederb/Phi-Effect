package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Project {
    private String id;
    private String name;
    private String projectOwner;
    private String location;
    private String description;
    private String genre;
    private String status;
    private String gpsCoordinates;
    private String projectStart;
    private String projectEnd;
}
