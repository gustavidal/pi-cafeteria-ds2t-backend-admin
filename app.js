// Import das dependências para criar a API
const express    = require('express')
const cors       = require('cors')

// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
}

// Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))



// Import do arquivo de rotas do ADMIN
const adminRouter = require('./routes/admin.router.js')
app.use('/v1/frequency80cafe/administracao/admin/', cors(), adminRouter)



// Iniciar a API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})