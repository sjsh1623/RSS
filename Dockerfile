FROM eclipse-temurin:17-jdk

# Gradle 설치
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://services.gradle.org/distributions/gradle-8.5-bin.zip && \
    unzip gradle-8.5-bin.zip && \
    mv gradle-8.5 /opt/gradle && \
    ln -s /opt/gradle/bin/gradle /usr/local/bin/gradle && \
    rm gradle-8.5-bin.zip

WORKDIR /app
COPY . .
RUN gradle :scheduler-server:bootJar
CMD ["java", "-jar", "scheduler-server/build/libs/scheduler-server-1.0.0.jar"] 