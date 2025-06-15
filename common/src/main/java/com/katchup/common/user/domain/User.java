package com.katchup.common.user.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * 사용자 엔티티
 * 
 * 시스템의 사용자 정보를 저장하는 엔티티입니다.
 * 이메일, 비밀번호 해시, 이름 등의 기본 정보를 포함합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 사용자 이메일 (고유 식별자) */
    @Column(nullable = false, unique = true)
    private String email;

    /** 비밀번호 해시값 */
    @Column(nullable = false)
    private String passwordHash;

    /** 사용자 이름 */
    private String name;

    /** 계정 생성 일시 */
    private LocalDateTime createdAt;

    /**
     * 사용자 생성자
     * 
     * @param id 사용자 ID
     * @param email 사용자 이메일
     * @param passwordHash 비밀번호 해시값
     * @param name 사용자 이름
     * @param createdAt 계정 생성 일시
     */
    @Builder
    public User(Long id, String email, String passwordHash, String name, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.name = name;
        this.createdAt = createdAt;
    }
} 