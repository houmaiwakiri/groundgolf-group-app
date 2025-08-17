FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY target/*.jar app.jar

RUN apt-get update && apt-get install -y vim

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
