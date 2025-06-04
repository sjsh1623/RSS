package com.katchup.common.user.service;

import com.katchup.common.user.domain.User;
import com.katchup.common.user.dto.UserCreateRequestDto;
import com.katchup.common.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void create() {
        UserCreateRequestDto dto = new UserCreateRequestDto();
        org.springframework.test.util.ReflectionTestUtils.setField(dto, "email", "test@example.com");
        org.springframework.test.util.ReflectionTestUtils.setField(dto, "password", "pw");
        org.springframework.test.util.ReflectionTestUtils.setField(dto, "name", "tester");
        User user = User.builder().id(1L).email(dto.getEmail()).passwordHash(dto.getPassword()).name(dto.getName()).build();
        when(userRepository.save(any(User.class))).thenReturn(user);
        var result = userService.create(dto);
        assertThat(result.getEmail()).isEqualTo(dto.getEmail());
        assertThat(result.getName()).isEqualTo(dto.getName());
    }

    @Test
    void findById() {
        User user = User.builder().id(1L).email("test@example.com").passwordHash("pw").name("tester").build();
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        var result = userService.findById(1L);
        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void findByEmail() {
        User user = User.builder().id(1L).email("test@example.com").passwordHash("pw").name("tester").build();
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        var result = userService.findByEmail("test@example.com");
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("tester");
    }

    @Test
    void findAll() {
        User user = User.builder().id(1L).email("test@example.com").passwordHash("pw").name("tester").build();
        when(userRepository.findAll()).thenReturn(List.of(user));
        var result = userService.findAll();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getEmail()).isEqualTo("test@example.com");
    }
} 