import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';
import TeamController from '../controllers/taemController';
import TeamService from '../services/teamService';
import MatchContoller from '../controllers/matchContoller';
import MatchSerice from '../services/matchSerice';

export const loginFactory = () => {
  const loginService = new LoginService();
  const loginController = new LoginController(loginService);

  return loginController;
};

export const teamFactory = () => {
  const teamService = new TeamService();
  const teamController = new TeamController(teamService);

  return teamController;
};

export const matchFactory = () => {
  const matchSerice = new MatchSerice();
  const matchContoller = new MatchContoller(matchSerice);

  return matchContoller;
};
