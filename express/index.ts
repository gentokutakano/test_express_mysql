import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import router from './routes/index'
import bodyParser from 'body-parser'

const app = express()
app.use(helmet())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.use('/', router)

app.listen(port)
console.log('listen on port ' + port)
