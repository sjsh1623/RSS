package com.katchup.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AuthCodeDto {
    private String email;
    private String code;
    private LocalDateTime expiresAt;
} 