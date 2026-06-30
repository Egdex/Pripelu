<<<<<<< Updated upstream
FROM maven:3.8.5-openjdk-17 AS build
=======
FROM maven:3.8.4-openjdk-17-slim AS build
>>>>>>> Stashed changes
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

<<<<<<< Updated upstream
# Paso 2: Imagen de ejecución ligera con Java 17
FROM eclipse-temurin:17-jre-alpine
=======
FROM openjdk:17-jdk-slim
>>>>>>> Stashed changes
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]