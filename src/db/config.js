const sqlite3 = require("sqlite3")
// Declarando dessa forma usando chaves, 
// você esta dizendo que quer a função open que esta no sqlite
const { open } = require("sqlite")

// A função open precisa estar dentro de uma estrutura de função
// Quando existe apenas um unico item dentro da arrow function não é necessário o uso das chaves
module.exports = () => 
    open({
        filename: "./database.sqlite",
        driver: sqlite3.Database
})


