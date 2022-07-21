import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';
import TeamController from '../controllers/taemController';
import TeamService from '../services/teamService';
import MatchContoller from '../controllers/matchContoller';
import MatchSerice from '../services/matchService';
import LeaderboardContoller from '../controllers/leaderboardController';
import LeaderboardSerice from '../services/leaderboardService';

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

export const leaderboardFactory = () => {
  const leaderboardSerice = new LeaderboardSerice();
  const leaderboardContoller = new LeaderboardContoller(leaderboardSerice);

  return leaderboardContoller;
};
