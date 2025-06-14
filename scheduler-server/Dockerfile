FROM eclipse-temurin:17-jdk as builder

WORKDIR /app

# Install Gradle
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://services.gradle.org/distributions/gradle-8.5-bin.zip && \
    unzip gradle-8.5-bin.zip && \
    mv gradle-8.5 /opt/gradle && \
    ln -s /opt/gradle/bin/gradle /usr/local/bin/gradle

# Copy the entire project
COPY . .

# Build common module first
RUN cd common && gradle clean build

# Build scheduler-server
RUN gradle :scheduler-server:bootJar

# Create a new stage for the runtime
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/scheduler-server/build/libs/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"] 