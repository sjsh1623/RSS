package com.katchup.api.auth.controller;

import com.katchup.api.auth.dto.TokenPairDto;
import com.katchup.api.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth API", description = "인증/인가 관련 API")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<TokenPairDto> login(@RequestParam @Email String email, @RequestParam @NotBlank String password) {
        return ResponseEntity.ok(authService.login(email, password));
    }

    // TODO: refresh, 인증코드 발송/검증 등 추가 구현
} 