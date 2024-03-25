package org.example.backend.exceptions;

import org.springframework.http.HttpStatus;

public class ApiError {

    private HttpStatus status;
    private String message;

    public ApiError(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    // getters and setters

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
