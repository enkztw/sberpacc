const path = require('path')

const express = require('express')
const webpack = require('webpack')
const bodyParser = require('body-parser')

const webpackDevMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('../webpack.config')

// Функция, которая осуществляет сборку
const compiler = webpack(webpackConfig)

express()
    // Автоматически парсит входящие json
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // Предоставляет доступ к файлам сборки в рантайме
    .use(webpackDevMiddleware(compiler))
    // Возврат html
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'))
    })
    // Инициализация
    .post('/init', (req, res) => {
        res.send({
            firstName: 'Иван',
            lastName: 'Иванов',
            middleName: 'Иванович'
        })
    })
    // Прием формы
    .post('/send', (req, res) => {
        console.table(req.body)

        res.send({
            status: 0
        })
    })
    // Активация сервера
    .listen(4242, null, () => {
        console.log('http://localhost:4242')
    })
