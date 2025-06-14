package com.katchup.common.user.service;

import com.katchup.common.user.domain.User;
import com.katchup.common.user.dto.UserCreateRequestDto;
import com.katchup.common.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
    @DisplayName("사용자 생성 성공")
    void create_success() {
        // given
        UserCreateRequestDto dto = new UserCreateRequestDto();
        org.springframework.test.util.ReflectionTestUtils.setField(dto, "email", "test@example.com");
        org.springframework.test.util.ReflectionTestUtils.setField(dto, "password", "pw");
        org.springframework.test.util.ReflectionTestUtils.setField(dto, "name", "tester");
        
        User user = User.builder()
            .id(1L)
            .email(dto.getEmail())
            .passwordHash(dto.getPassword())
            .name(dto.getName())
            .build();
            
        when(userRepository.save(any(User.class))).thenReturn(user);

        // when
        var result = userService.create(dto);

        // then
        assertThat(result.getEmail()).isEqualTo(dto.getEmail());
        assertThat(result.getName()).isEqualTo(dto.getName());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("이메일로 사용자 조회 성공")
    void findByEmail_success() {
        // given
        String email = "test@example.com";
        User user = User.builder()
            .id(1L)
            .email(email)
            .passwordHash("pw")
            .name("tester")
            .build();
            
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // when
        var result = userService.findByEmail(email);

        // then
        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo(email);
        assertThat(result.get().getName()).isEqualTo("tester");
    }

    @Test
    @DisplayName("이메일로 사용자 조회 실패 - 사용자 없음")
    void findByEmail_notFound() {
        // given
        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // when
        var result = userService.findByEmail(email);

        // then
        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("ID로 사용자 조회 성공")
    void findById_success() {
        // given
        Long userId = 1L;
        User user = User.builder()
            .id(userId)
            .email("test@example.com")
            .passwordHash("pw")
            .name("tester")
            .build();
            
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // when
        var result = userService.findById(userId);

        // then
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(userId);
        assertThat(result.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    @DisplayName("모든 사용자 조회")
    void findAll_success() {
        // given
        User user1 = User.builder().id(1L).email("test1@example.com").passwordHash("pw").name("tester1").build();
        User user2 = User.builder().id(2L).email("test2@example.com").passwordHash("pw").name("tester2").build();
        
        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        // when
        var result = userService.findAll();

        // then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getEmail()).isEqualTo("test1@example.com");
        assertThat(result.get(1).getEmail()).isEqualTo("test2@example.com");
    }
} 