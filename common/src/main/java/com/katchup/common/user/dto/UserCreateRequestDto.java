package com.katchup.common.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UserCreateRequestDto {
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    private String name;
} 