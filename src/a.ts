import dotenv from "dotenv";
dotenv.config();

console.log("MONGO:", process.env.MONGO_API);
console.log("SQL:", process.env.SQL_API);
console.log("HOST:", process.env.HOST);
console.log(JSON.stringify(process.env, null, 2));
