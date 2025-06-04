package com.katchup.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenPairDto {
    private String accessToken;
    private String refreshToken;
} 