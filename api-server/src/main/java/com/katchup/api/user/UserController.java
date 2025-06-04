package com.katchup.api.user;

import com.katchup.common.user.dto.UserCreateRequestDto;
import com.katchup.common.user.dto.UserDto;
import com.katchup.common.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "User API", description = "유저 관련 API")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "회원가입")
    @PostMapping
    public ResponseEntity<UserDto> create(@RequestBody @Valid UserCreateRequestDto dto) {
        return ResponseEntity.ok(userService.create(dto));
    }

    @Operation(summary = "ID로 유저 조회")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "이메일로 유저 조회")
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "모든 유저 조회")
    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }
} 