import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: {
      backgroundColor: Colors.brandDark,
      borderBottomWidth: 0,
      padding: 15
    },
    titleStyle: {
      color: '#fff',
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: 18,
      fontWeight: 'bold'
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: false,
    inactiveTintColor: Colors.textColor,
    activeTintColor: Colors.brandPrimary,
    tabBarStyle: { backgroundColor: '#fff' },
    labelStyle: { fontSize: 13 }
  },

  icons: {
    style: { fontSize: 23 },
  },
};
