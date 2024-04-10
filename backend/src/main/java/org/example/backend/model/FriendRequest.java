package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FriendRequest {
    private String id;
    private User sender;
    private User receiver;
    private String status;
    @CreatedDate
    private Instant timestamp;
}