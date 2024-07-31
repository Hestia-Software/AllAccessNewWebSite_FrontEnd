import { useSelector } from 'react-redux';
import { getCookie } from './AllCookies';
import Constants from '../redux/constants/AuthConstant';

const UserData = () => {
  const AuthUsers = useSelector((state) => state?.Login?.user);
  const user = getCookie(Constants.AUTH_TOKEN);

  const getUserName = () => {
    const { firstName, middleName, lastName } = user || AuthUsers || {};
    return `${firstName} ${middleName} ${lastName}`;
  };

  const getUserLoginToken = () => {
    const { token } = user || AuthUsers || {};
    return token;
  };

  const getLoginName = () => {
    const firstName = user?.data?.firstName ;
    return firstName;
  };

  const getRoles = () => {
    return user?.data?.roles;
  };

  const getUserInformation = () => {
    return user ;
  };

  return {
    getUserName,
    getRoles,
    getUserInformation,
    getLoginName,
    getUserLoginToken,
  };
};

export default UserData;
