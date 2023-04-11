import { createConnection } from "typeorm";
import ormconfig from "../../ormconfig";

createConnection(JSON.parse(JSON.stringify(ormconfig)))
    .then(() => console.log("Database connected!"))
    .catch((error) => console.log("Error connecting to database: ", error));
