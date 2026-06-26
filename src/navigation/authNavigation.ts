export type AuthScreenName = 'Login' | 'SignUp';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Nav = any;

/** Reset root to Auth stack with a specific screen (Login or SignUp). */
export function resetToAuthScreen(navigation: Nav, screen: AuthScreenName) {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: 'AuthStack',
        state: {
          routes: [{ name: screen }],
        },
      },
    ],
  });
}

/** Reset root to Auth stack (defaults to Login). */
export function resetToAuthStack(navigation: Nav) {
  resetToAuthScreen(navigation, 'Login');
}

/** Switch between Login and SignUp inside Auth stack. */
export function switchAuthScreen(navigation: Nav, screen: AuthScreenName) {
  navigation.navigate(screen);
}

/** Open Auth from root (nested navigator). */
export function navigateAuthScreen(navigation: Nav, screen: AuthScreenName) {
  const routeNames = navigation.getState?.()?.routeNames ?? [];
  if (routeNames.includes(screen)) {
    navigation.navigate(screen);
    return;
  }
  navigation.navigate('AuthStack', { screen });
}

/** Return guest to Home tab. */
export function navigateToHomeTab(navigation: Nav) {
  navigation.navigate('MainTabNavigator', { screen: 'Home' });
}

/** Open AI Guide tab from root or nested navigators. */
export function navigateToAiGuideTab(navigation: Nav) {
  const routeNames = navigation.getState?.()?.routeNames ?? [];
  if (routeNames.includes('MainTabNavigator')) {
    navigation.navigate('MainTabNavigator', { screen: 'AI_Guide' });
    return;
  }
  if (routeNames.includes('AI_Guide')) {
    navigation.navigate('AI_Guide');
    return;
  }
  navigation.getParent?.()?.navigate('MainTabNavigator', { screen: 'AI_Guide' });
}
