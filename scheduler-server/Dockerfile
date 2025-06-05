FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY . .
COPY ../scripts/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh && ./gradlew bootJar
CMD ["/wait-for-it.sh", "db:5432", "/wait-for-it.sh", "embedding:8000", "java", "-jar", "build/libs/scheduler-server-1.0.0.jar"] 