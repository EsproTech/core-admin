#### CORE ####

#### Implementación ####

### Variable de cabecera para las claves ###
X-API-Key

### Generar un archivo semilla para los datos ###
sequelize seed:generate --name NameSemilla

### Poblar la base de datos ###
npx sequelize-cli db:seed:all

### Corriendo una migracion ###
npx sequelize-cli db:migrate
