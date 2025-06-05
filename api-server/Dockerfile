FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY . .
RUN ./gradlew bootJar
COPY ../scripts/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD ["/wait-for-it.sh", "db:5432", "java", "-jar", "build/libs/api-server-1.0.0.jar"] 