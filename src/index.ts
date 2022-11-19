import express from "express"
import env from "./env"

import apiRouter from "./api"
import path from "path"

/**
 * On créé une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
const DIST_DIR = path.join(__dirname, "../dist_client")
const HTML_FILE = path.join(DIST_DIR, "index.html")
app.use(express.static(DIST_DIR))
app.get("/", (_, res) => res.send(HTML_FILE))

app.use("/api", apiRouter)

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
// app.all("*", UnknownRoutesHandler)

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
// app.use(ExceptionsHandler)

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(env.API_PORT, () =>
  console.log("Silence, ça tourne.")
)
