const Database = require("./config")

const initDb = {
    
    // O asyn iforma que a estrutura, no caso, a init() tem await.
    async init(){

// Iniciar a conexão do db
const db = await Database()

// Criando a tabela profile
await db.exec(`CREATE TABLE profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`)

// Criando a tabela jobs
await db.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`)

// Rodar comando inserir dacleados na tabela profile
await db.run(`INSERT INTO profile(
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES (
    "Patrick",
    "https://github.com/POliveira29.png",
    3000,
    5,
    8,
    4,
    75
);`)

// Rodar comando inserir dados na tabela jobs
await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    2,
    6,
    1617514376018
);`)

// Rodar comando inserir dados na tabela jobs
await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo",
    3,
    2,
    1617514376018
);`)

// Fecha a conexão com o db
await db.close()
    }
}

initDb.init()