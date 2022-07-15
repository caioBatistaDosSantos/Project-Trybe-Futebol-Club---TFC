import { Router } from 'express';
import { loginFactory, teamFactory, matchFactory } from '../factory/index';
import validateToken from '../middlewares/validateToken';

const routes = Router();

routes.get('/login/validate', validateToken, (req, res, next) => {
  loginFactory().validateLogin(req, res, next);
});

routes.get('/teams', (req, res, next) => {
  teamFactory().getAllTeams(req, res, next);
});

routes.get('/teams/:id', (req, res, next) => {
  teamFactory().getTeamById(req, res, next);
});

routes.get('/matches', (req, res, next) => {
  matchFactory().getAllMatches(req, res, next);
});

routes.post('/login', (req, res, next) => {
  loginFactory().login(req, res, next);
});

routes.post('/matches', validateToken, (req, res, next) => {
  matchFactory().createMatch(req, res, next);
});

routes.patch('/matches/:id/finish', (req, res, next) => {
  matchFactory().finishMatch(req, res, next);
});

export default routes;
