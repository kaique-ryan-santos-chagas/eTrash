const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const routesAuth = express.Router();

const CompaniesController = require('./controllers/CompaniesController');
const UserController = require('./controllers/UserController');
const PointController = require('./controllers/PointController');
const DiscartController = require('./controllers/DiscartController');
const ProfileController = require('./controllers/ProfileController');

const authMiddleware = require('./middlewares/auth');
const MulterUsers = require('./config/MulterUsers');
const MulterCompanies = require('./config/MulterCompanies');
const MulterPoints = require('./config/MulterPoints');

routesAuth.use(authMiddleware);
routesAuth.use(express.urlencoded({extended: true }));
routesAuth.use(morgan('dev'));

routesAuth.post('/users/upload', multer(MulterUsers).single('file'), UserController.upload);
routesAuth.get('/users', UserController.index);
routesAuth.delete('/users/delete', UserController.delete);

routesAuth.post('/companies/upload', multer(MulterCompanies).single('file'), CompaniesController.upload);
routesAuth.get('/companies', CompaniesController.index);
routesAuth.delete('/companies/delete', CompaniesController.delete);
routesAuth.post('/companies/sheduling', CompaniesController.scheduling);
routesAuth.get('/companies/schedule', CompaniesController.schedule);

routesAuth.post('/point/upload', multer(MulterPoints).single('file'), PointController.upload);
routesAuth.get('/point', PointController.index);
routesAuth.delete('/point/delete', PointController.delete); // Erro aqui no delete, diz algo sobre violar a foreign key ???

routesAuth.put('/discarts/user', DiscartController.userCreate);
routesAuth.put('/discarts/company', DiscartController.companyCreate);
routesAuth.put('/discarts/point', DiscartController.pointCreate);
routesAuth.get('/discarts/points', DiscartController.searchPointForUser);//Testa no seu, o meu diz que não consegue ler a posição 0 no vetor se for nulo então não entra no IF (Linha 78), quando os discarts do usuario são os mesmos.

routesAuth.get('/profile/user', ProfileController.userProfile);
routesAuth.post('/profile/user/avatar', multer(MulterUsers).single('file'), ProfileController.updateUserAvatar); //Erro na linha 58 (não foi possivel ler a propiedade originalname que é indefinida)
routesAuth.get('/profile/company', ProfileController.companyProfile);
routesAuth.post('/profile/company/avatar', multer(MulterCompanies).single('file'), ProfileController.updateCompanyAvatar);//Erro na linha 124 (não foi possivel ler a propiedade originalname que é indefinida)
routesAuth.get('/profile/point', ProfileController.pointProfile);
routesAuth.post('/profile/point/avatar', multer(MulterPoints).single('file'), ProfileController.updatePointAvatar);//Erro na linha 186 (não foi possivel ler a propiedade originalname que é indefinida)

module.exports = routesAuth;