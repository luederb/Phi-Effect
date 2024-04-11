package org.example.backend.model;

import lombok.Getter;

@Getter
public enum Status {
    PENDING("pending"),
    ACCEPTED("accepted"),
    REJECTED("rejected");

    private final String statusValue;

    Status(String statusValue) {
        this.statusValue = statusValue;
    }

}
