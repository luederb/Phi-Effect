package org.example.backend.model;

import lombok.Getter;

@Getter
public enum Status {
    PENDING("PENDING"),
    ACCEPTED("ACCEPTED"),
    REJECTED("REJECTED");

    private final String statusValue;

    Status(String statusValue) {
        this.statusValue = statusValue;
    }

}
