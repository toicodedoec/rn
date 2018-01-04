import { StackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Home from '../screens/Home';

export default StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: () => null,
    },
  },
  Home: {
    screen: Home,
  },

});
