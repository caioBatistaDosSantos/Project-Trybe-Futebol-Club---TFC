import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';

const loginFactory = () => {
  const loginService = new LoginService();
  const loginController = new LoginController(loginService);

  return loginController;
};

export default loginFactory;
