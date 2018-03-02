module.exports = {
  db: {
    name: "db",
    connector: "memory"
  },
  mongoDB: {
    host: process.env.MONGO_HOST || "localhost",
    port: process.env.MONGO_PORT || 27017,
    url: "",
    database: process.env.MONGO_DATABASE || "si-master",
    password: process.env.MONGO_PASSWORD || "",
    name: "mongoDB",
    user: process.env.MONGO_USER || "",
    connector: "mongodb"
  }
}
