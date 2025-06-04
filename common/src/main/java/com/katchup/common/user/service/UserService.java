package com.katchup.common.user.service;

import com.katchup.common.user.domain.User;
import com.katchup.common.user.dto.UserCreateRequestDto;
import com.katchup.common.user.dto.UserDto;
import com.katchup.common.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserDto create(UserCreateRequestDto dto) {
        // TODO: 실제 비밀번호 해시 처리 필요
        String passwordHash = dto.getPassword();
        User user = User.builder()
                .email(dto.getEmail())
                .passwordHash(passwordHash)
                .name(dto.getName())
                .createdAt(LocalDateTime.now())
                .build();
        return toDto(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public Optional<UserDto> findById(Long id) {
        return userRepository.findById(id).map(this::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<UserDto> findByEmail(String email) {
        return userRepository.findByEmail(email).map(this::toDto);
    }

    @Transactional(readOnly = true)
    public List<UserDto> findAll() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getCreatedAt()
        );
    }
} 