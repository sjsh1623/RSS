# 1단계: 빌드
FROM amazoncorretto:21 as builder
WORKDIR /app
COPY . .
RUN ./gradlew bootJar

# 2단계: 런타임
FROM amazoncorretto:21
WORKDIR /app
COPY --from=builder /app/build/libs/katchup-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"] 