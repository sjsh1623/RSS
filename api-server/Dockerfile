FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY . .
RUN ./gradlew bootJar
CMD ["java", "-jar", "build/libs/api-server-1.0.0.jar"] 