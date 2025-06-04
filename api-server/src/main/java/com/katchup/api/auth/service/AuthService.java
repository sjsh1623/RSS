package com.katchup.api.auth.service;

import com.katchup.api.auth.dto.TokenPairDto;
import com.katchup.api.user.domain.User;
import com.katchup.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    // TODO: Token, AuthCode 저장소(Repository) 주입 필요

    @Transactional(readOnly = true)
    public TokenPairDto login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // TODO: 비밀번호 해시 검증
        if (!user.getPasswordHash().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        // TODO: JWT 토큰 발급 및 refreshToken 저장
        String accessToken = "access-token"; // TODO
        String refreshToken = "refresh-token"; // TODO
        return new TokenPairDto(accessToken, refreshToken);
    }

    @Transactional
    public void saveRefreshToken(String email, String refreshToken, LocalDateTime expiresAt) {
        // TODO: refreshToken 저장 로직 구현
    }

    @Transactional(readOnly = true)
    public String findRefreshToken(String email) {
        // TODO: refreshToken 조회 로직 구현
        return null;
    }

    @Transactional
    public void removeRefreshToken(String email) {
        // TODO: refreshToken 삭제 로직 구현
    }

    @Transactional
    public void saveAuthCode(String email, String code, LocalDateTime expiresAt) {
        // TODO: 인증코드 저장 로직 구현
    }

    @Transactional(readOnly = true)
    public boolean verifyAuthCode(String email, String code) {
        // TODO: 인증코드 검증 로직 구현
        return false;
    }
} 