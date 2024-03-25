package org.example.backend;
import org.example.backend.exceptions.ApiError;
import org.example.backend.exceptions.GlobalExceptionHandler;
import org.example.backend.exceptions.UserAlreadyExistsException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GlobalExceptionHandlerTest {

    @InjectMocks
    private GlobalExceptionHandler globalExceptionHandler;

    @Mock
    private WebRequest webRequest;

    @Test
    public void handleUserAlreadyExistsExceptionTest() {
        UserAlreadyExistsException exception = new UserAlreadyExistsException("User already exists");
        when(webRequest.getRemoteUser()).thenReturn("testUser");

        ResponseEntity<Object> responseEntity = globalExceptionHandler.handleUserAlreadyExists(exception, webRequest);

        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("User already exists", ((ApiError) responseEntity.getBody()).getMessage());
    }
    @Test
    public void handleIllegalArgumentExceptionTest() {
        IllegalArgumentException exception = new IllegalArgumentException("Illegal argument");
        when(webRequest.getRemoteUser()).thenReturn("testUser");

        ResponseEntity<String> responseEntity = globalExceptionHandler.handleIllegalArgumentException(exception, webRequest);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Illegal argument", responseEntity.getBody());
    }
    @Test
    public void handleGeneralExceptionTest() {
        Exception exception = new Exception("An unexpected error occurred");
        when(webRequest.getRemoteUser()).thenReturn("testUser");

        ResponseEntity<String> responseEntity = globalExceptionHandler.handleGeneralException(exception, webRequest);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An unexpected error occurred", responseEntity.getBody());
    }
    @Test
    public void handleGeneralExceptionTest_noUser() {
        Exception exception = new Exception("An unexpected error occurred");
        when(webRequest.getRemoteUser()).thenReturn(null);

        ResponseEntity<String> responseEntity = globalExceptionHandler.handleGeneralException(exception, webRequest);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An unexpected error occurred", responseEntity.getBody());
    }
    @Test
    public void handleGeneralExceptionTest_noExceptionMessage() {
        Exception exception = new Exception();
        when(webRequest.getRemoteUser()).thenReturn("testUser");

        ResponseEntity<String> responseEntity = globalExceptionHandler.handleGeneralException(exception, webRequest);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An unexpected error occurred", responseEntity.getBody());
    }
    @Test
    public void handleGeneralExceptionTest_noUser_noExceptionMessage() {
        Exception exception = new Exception();
        when(webRequest.getRemoteUser()).thenReturn(null);

        ResponseEntity<String> responseEntity = globalExceptionHandler.handleGeneralException(exception, webRequest);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An unexpected error occurred", responseEntity.getBody());
    }
}
