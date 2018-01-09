## Java-Spring based backend

Before running: 
* `mvn clean install`
* Fill in MYSQL server info under `application.properties`

Default port is : `8080`

Endpoints:
- `/funds` - get all funds
   * Supports paging and sorting.
   * Exmaple: `/funds?page=0&size=3&sort=topPerformance&direction=DESC`