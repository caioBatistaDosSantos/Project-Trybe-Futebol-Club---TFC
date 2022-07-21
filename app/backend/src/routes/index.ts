import { Router } from 'express';
import {
  loginFactory,
  teamFactory,
  matchFactory,
  leaderboardFactory,
} from '../factory/index';
import validateToken from '../middlewares/validateToken';
import validateCreateMatch from '../middlewares/validateCreateMatch';

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

routes.get('/leaderboard', (req, res, next) => {
  leaderboardFactory().getLeaderboardAll(req, res, next);
});

routes.get('/leaderboard/home', (req, res, next) => {
  leaderboardFactory().getLeaderboardHome(req, res, next);
});

routes.post('/login', (req, res, next) => {
  loginFactory().login(req, res, next);
});

routes.post('/matches', validateToken, validateCreateMatch, (req, res, next) => {
  matchFactory().createMatch(req, res, next);
});

routes.patch('/matches/:id', (req, res, next) => {
  matchFactory().updateMatch(req, res, next);
});

routes.patch('/matches/:id/finish', (req, res, next) => {
  matchFactory().finishMatch(req, res, next);
});

export default routes;
