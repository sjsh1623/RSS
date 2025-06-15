package com.katchup.common.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

/**
 * 사용자 DTO
 * 
 * 사용자 정보를 클라이언트에 전달하기 위한 DTO입니다.
 * 사용자의 기본 정보를 포함하며, 보안을 위해 비밀번호는 제외됩니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Getter
@AllArgsConstructor
public class UserDto {
    /** 사용자 ID */
    private Long id;

    /** 사용자 이메일 */
    private String email;

    /** 사용자 이름 */
    private String name;

    /** 계정 생성 일시 */
    private LocalDateTime createdAt;
} 