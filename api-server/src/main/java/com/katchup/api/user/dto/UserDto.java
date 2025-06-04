package com.katchup.api.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private LocalDateTime createdAt;
} 