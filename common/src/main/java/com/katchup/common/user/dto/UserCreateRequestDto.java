package com.katchup.common.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

/**
 * 사용자 생성 요청 DTO
 * 
 * 새로운 사용자 계정 생성을 위한 요청 데이터를 담는 DTO입니다.
 * 이메일, 비밀번호, 이름 등의 필수 정보를 포함합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Getter
public class UserCreateRequestDto {
    /** 사용자 이메일 (이메일 형식 검증) */
    @Email
    @NotBlank
    private String email;

    /** 사용자 비밀번호 (공백 불가) */
    @NotBlank
    private String password;

    /** 사용자 이름 */
    private String name;
} 