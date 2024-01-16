import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import handlebars from "express-handlebars";
import displayRoutes from "express-routemap";
import __dirname from "./utils.js";
import mongoStore from "connect-mongo";

// Importación de rutas:
import viewsRouter from "./routes/views.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";

// Variables:
const app = express();
const PORT = 8080;
const MONGO_URL =
  "mongodb+srv://lauullerandi:123@backend.fdqdzbf.mongodb.net/?retryWrites=true&w=majority";

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
  })
);

// Handlebars:
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Conneción con Mongo Atlas:
const connection = mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log("CONECTADO!");
  })
  .catch((err) => {
    console.log(err);
  });

// Rutas:
app.use("/", viewsRouter);
app.use("/api/session", sessionsRouter);

// Levantar el servidor:
app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on PORT: ${PORT}`);
});
