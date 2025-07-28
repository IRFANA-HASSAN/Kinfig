import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { SvgXml } from 'react-native-svg';

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/auth/onboard');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoSvg = `<svg width="83" height="111" viewBox="0 0 83 111" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.09517 65.4156C10.6425 62.3502 14.9684 57.3002 17.294 51.1748C17.6747 50.212 18.16 49.2989 18.7401 48.4536C19.6527 47.0927 20.8733 45.993 22.2915 45.2544C23.7096 44.5157 25.2804 44.1615 26.8615 44.2237C28.2635 44.1777 29.6569 44.4716 30.9339 45.0828C32.2108 45.694 33.3373 46.6061 34.2263 47.7486C34.6273 48.2561 34.99 48.7959 35.3109 49.363L52.4173 40.2757C52.4173 38.333 51.6844 36.4699 50.3798 35.0963C49.0753 33.7226 47.3059 32.9509 45.461 32.9509H36.8642V39.1195H36.6701C33.617 34.1423 29.0241 31.6537 22.8912 31.6537C16.0308 31.6537 10.5005 34.2974 6.30031 39.5848C2.10015 44.8722 8.27511e-05 52.0067 8.27511e-05 60.9883C-0.0044468 63.2822 0.176982 65.5723 0.542398 67.8337L5.09517 65.4156Z" fill="#48AD50"/>
<path d="M37.0518 59.4298V60.5296C37.0518 64.8159 36.0586 68.2633 34.0724 70.8718C33.1577 72.1259 31.9742 73.1341 30.6185 73.8142C29.2628 74.4942 27.7735 74.8267 26.2724 74.7845C24.7908 74.8442 23.3177 74.5237 21.9799 73.8507C20.6421 73.1777 19.4797 72.1723 18.5929 70.9211C18.4791 70.766 18.3786 70.5898 18.2648 70.4276L4.4592 78.5068C4.83413 79.0778 5.22247 79.6419 5.64427 80.1776C9.4204 84.9434 14.5244 87.3262 20.9563 87.3262C27.8792 87.3262 33.1127 84.3559 36.6567 78.4152H36.8643V82.6451C36.8643 87.6552 35.4225 91.6196 32.5391 94.5383C29.6557 97.4569 25.585 98.9186 20.327 98.9233C14.7816 98.8445 9.35856 97.1959 4.62658 94.1505L6.18659 107.94C10.1591 109.975 15.5399 110.995 22.3288 111C32.5994 111 38.8862 108.293 44.3027 102.885C49.7192 97.4781 52.424 89.8501 52.424 80.0014V50.4412L37.0518 59.4298Z" fill="#2A327E"/>
<path d="M47.5765 28.0304C47.5765 28.0304 32.4251 24.5477 39.81 0C39.81 0 56.3206 11.6605 53.2006 24.3433C53.2006 24.3433 58.0546 13.705 67.1869 12.6828C72.3509 12.164 77.4374 10.9971 82.3384 9.20716C82.3384 9.20716 76.5135 36.8216 57.0838 31.506C57.0838 31.506 68.4658 28.961 72.8244 20.0499C72.8244 20.0499 48.1523 40.7131 42.6957 12.295C42.7024 12.2739 40.9549 15.1432 47.5765 28.0304Z" fill="#48AD50"/>
</svg>`;

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <SvgXml xml={logoSvg} width={120} height={120} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leafContainer: {
    position: 'absolute',
    top: 0,
    left: 35,
    zIndex: 2,
  },
  leaf: {
    width: 25,
    height: 35,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    transform: [{ rotate: '30deg' }],
  },
  letterG: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gShape: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 8,
    borderColor: '#2196F3',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
});