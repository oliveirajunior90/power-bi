const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const controller = require('./controller/request.controller')
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/request-ga-avantare', controller.gaController)

//CONEXÃO COM O BANCO DE DADOS
const sequelize = new Sequelize('powerbi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    },
})

// CRIANDO TABELAS
const PowerBI = sequelize.define('meta_ga_items', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    meta_date: Sequelize.STRING,
    meta_origin: Sequelize.STRING,
    meta_media: Sequelize.STRING,
    meta_campaign: Sequelize.STRING,
    meta_session: Sequelize.STRING,
    meta_impressions: Sequelize.STRING
})

// DELETANDO DADOS ANTIGOS
fetch('http://localhost:3100/request-ga-avantare')
    .then(function (data) {
        return data.json()
    }).then(function (data) {
        ('parsed json', data)
        for (var i in data) {
            console.log(data[i]);
            for (var a in data[i]) {
                console.log(data[i][a][0]);
                console.log(data[i][a][1]);
                console.log(data[i][a][2]);
                console.log(data[i][a][3]);
                console.log(data[i][a][4]);
                console.log(data[i][a][5]);

                // DELETANDO ULTIMOS DADOS
                PowerBI.destroy({
                    where: {
                        meta_date: data[i][a][0],
                        meta_origin: data[i][a][1],
                        meta_media: data[i][a][2],
                        meta_campaign: data[i][a][3],
                        meta_session: data[i][a][4],
                        meta_impressions: data[i][a][5]
                    }
                })
            }
        }

    }).catch(function (ex) {
        console.log('parsing failed', ex)
    })

sequelize.sync()

// CADASTRANDO NOVOS DADOS
setTimeout(function () {
    fetch('http://localhost:3100/request-ga-avantare')
        .then(function (data) {
            return data.json()
        }).then(function (data) {
            ('parsed json', data)
            for (var i in data) {
                console.log(data[i]);
                for (var a in data[i]) {
                    console.log(data[i][a][0]);
                    console.log(data[i][a][1]);
                    console.log(data[i][a][2]);
                    console.log(data[i][a][3]);
                    console.log(data[i][a][4]);
                    console.log(data[i][a][5]);

                    // CADASTRANDO NO BANCO DE DADOS
                    PowerBI.create({
                        meta_date: data[i][a][0],
                        meta_origin: data[i][a][1],
                        meta_media: data[i][a][2],
                        meta_campaign: data[i][a][3],
                        meta_session: data[i][a][4],
                        meta_impressions: data[i][a][5]
                    })
                        .then(function (task) {
                            task.save();
                        })
                }
            }

        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
}, 1000)

sequelize.sync()


module.exports = app