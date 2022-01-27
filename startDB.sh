docker run \
    --name some-mariadb \
    --rm \
    -p 3306:3306  \
    --env MARIADB_USER=auto-archiver \
    --env MARIADB_PASSWORD=password \
    --env MARIADB_ROOT_PASSWORD=rootpassword \
    --env MARIADB_DATABASE=auto-archiver \
    mariadb:latest
