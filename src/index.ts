import express from 'express'
import helmet from 'helmet'
import session from 'express-session'
import routes from './routes'

const app = express()
app.use(helmet())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 30 },
}))
app.use(express.json())

app.use(routes)

app.listen(8000, () => {
  console.log('Server is running on port 8000')
})