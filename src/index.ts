import express from 'express'
import swaggerUI from 'swagger-ui-express'
import path from 'path'
import { load } from 'js-yaml'
import fs from 'fs'

import apiRouter from './api'
import env from './env'

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
const DIST_DIR = path.join(__dirname, '../dist_client')
const HTML_FILE = path.join(DIST_DIR, 'index.html')
app.use(express.static(DIST_DIR))
app.get('/', (_, res) => res.send(HTML_FILE))

app.use('/api', apiRouter)
app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(load(fs.readFileSync('open-api.yaml', 'utf8')) as Object)
)

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
app.listen(env.API_PORT, () => console.log('Silence, ça tourne.'))
