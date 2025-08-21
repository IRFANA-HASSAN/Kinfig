import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

interface IconState {
  home: string | null;
  homeColor: string | null;
  create: string | null;
  createColor: string | null;
  notification: string | null;
  notificationColor: string | null;
  profile: string | null;
  profileColor: string | null;
  group: string | null;
  groupColor: string | null;
}

export default function TabLayout() {
  const [icons, setIcons] = useState<IconState>({
    home: null,
    homeColor: null,
    create: null,
    createColor: null,
    notification: null,
    notificationColor: null,
    profile: null,
    profileColor: null,
    group: null,
    groupColor: null,
  });

  useEffect(() => {
    const loadIcons = async () => {
      try {
        // Load all SVG assets (regular and colored versions)
        const homeAsset = Asset.fromModule(require('@/assets/icons/home.svg'));
        const homeColorAsset = Asset.fromModule(require('@/assets/icons/homecolor.svg'));
        const createAsset = Asset.fromModule(require('@/assets/icons/create.svg'));
        const createColorAsset = Asset.fromModule(require('@/assets/icons/createcolor.svg'));
        const notificationAsset = Asset.fromModule(require('@/assets/icons/notification.svg'));
        const notificationColorAsset = Asset.fromModule(require('@/assets/icons/notificationcolor.svg'));
        const profileAsset = Asset.fromModule(require('@/assets/icons/profile.svg'));
        const profileColorAsset = Asset.fromModule(require('@/assets/icons/profilecolor.svg'));
        const groupAsset = Asset.fromModule(require('@/assets/icons/Group.svg'));
        const groupColorAsset = Asset.fromModule(require('@/assets/icons/Groupcolor.svg'));

        // Download all assets
        await Promise.all([
          homeAsset.downloadAsync(),
          homeColorAsset.downloadAsync(),
          createAsset.downloadAsync(),
          createColorAsset.downloadAsync(),
          notificationAsset.downloadAsync(),
          notificationColorAsset.downloadAsync(),
          profileAsset.downloadAsync(),
          profileColorAsset.downloadAsync(),
          groupAsset.downloadAsync(),
          groupColorAsset.downloadAsync(),
        ]);

        // Read all SVG content
        const [home, homeColor, create, createColor, notification, notificationColor, profile, profileColor, group, groupColor] = await Promise.all([
          FileSystem.readAsStringAsync(homeAsset.localUri || homeAsset.uri),
          FileSystem.readAsStringAsync(homeColorAsset.localUri || homeColorAsset.uri),
          FileSystem.readAsStringAsync(createAsset.localUri || createAsset.uri),
          FileSystem.readAsStringAsync(createColorAsset.localUri || createColorAsset.uri),
          FileSystem.readAsStringAsync(notificationAsset.localUri || notificationAsset.uri),
          FileSystem.readAsStringAsync(notificationColorAsset.localUri || notificationColorAsset.uri),
          FileSystem.readAsStringAsync(profileAsset.localUri || profileAsset.uri),
          FileSystem.readAsStringAsync(profileColorAsset.localUri || profileColorAsset.uri),
          FileSystem.readAsStringAsync(groupAsset.localUri || groupAsset.uri),
          FileSystem.readAsStringAsync(groupColorAsset.localUri || groupColorAsset.uri),
        ]);

        setIcons({ home, homeColor, create, createColor, notification, notificationColor, profile, profileColor, group, groupColor });
      } catch (error) {
        console.error('Error loading SVG icons:', error);
        // You could set fallback icons here or show a loading state
      }
    };

    loadIcons();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 12,
          height: 80,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative' 
            }}>
              {focused ? (icons.homeColor ? (
                <SvgXml 
                  xml={icons.homeColor} 
                  width={28} 
                  height={28} 
                />
              ) : (
                <View style={{ 
                  width: 28, 
                  height: 28, 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: 4 
                }} />
              )) : (icons.home ? (
                <SvgXml 
                  xml={icons.home} 
                  width={28} 
                  height={28} 
                  color="#999"
                />
              ) : (
                <View style={{ 
                  width: 28, 
                  height: 28, 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: 4 
                }} />
              ))}
              {focused && (
                <View style={{
                  position: 'absolute',
                  bottom: -12,
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#4CAF50',
                }} />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
  name="group"
  options={{
    title: 'Group',
    tabBarIcon: ({ focused }) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {focused ? (
          icons.groupColor ? (
            <SvgXml xml={icons.groupColor} width={28} height={28} />
          ) : (
            <View
              style={{
                width: 28,
                height: 28,
                backgroundColor: '#f0f0f0',
                borderRadius: 4,
              }}
            />
          )
        ) : icons.group ? (
          <SvgXml xml={icons.group} width={28} height={28} />
        ) : (
          <View
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#f0f0f0',
              borderRadius: 4,
            }}
          />
        )}

        {/* Green dot indicator like Home */}
        {focused && (
          <View
            style={{
              position: 'absolute',
              bottom: -12,
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#4CAF50',
            }}
          />
        )}
      </View>
    ),
  }}
/>


      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused }) => (
            <View style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative' 
            }}>
              {focused ? (icons.createColor ? (
                <View style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <SvgXml 
                    xml={icons.createColor} 
                    width={24} 
                    height={24} 
                  />
                </View>
              ) : (
                <View style={{ 
                  width: 40, 
                  height: 40, 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }} />
              )) : (icons.create ? (
                <View style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <SvgXml 
                    xml={icons.create} 
                    width={24} 
                    height={24} 
                    color="#999"
                  />
                </View>
              ) : (
                <View style={{ 
                  width: 40, 
                  height: 40, 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }} />
              ))}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <View style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative' 
            }}>
              {focused ? (icons.notificationColor ? (
                <SvgXml 
                  xml={icons.notificationColor} 
                  width={28} 
                  height={28} 
                />
              ) : (
                <View style={{ 
                  width: 28, 
                  height: 28, 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: 4 
                }} />
              )) : (icons.notification ? (
                <SvgXml 
                  xml={icons.notification} 
                  width={28} 
                  height={28} 
                  color="#999"
                />
              ) : (
                <View style={{ 
                  width: 28, 
                  height: 28, 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: 4 
                }} />
              ))}
              {focused && (
                <View style={{
                  position: 'absolute',
                  bottom: -12,
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#4CAF50',
                }} />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative' 
            }}>
              {focused ? (icons.profileColor ? (
                <SvgXml 
                  xml={icons.profileColor} 
                  width={28} 
                  height={28} 
                />
              ) : (
                <View style={{ 
                  width: 28, 
                  height: 28, 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: 4 
                }} />
              )) : (icons.profile ? (
                <SvgXml 
                  xml={icons.profile} 
                  width={28} 
                  height={28} 
                  color="#999"
                />
              ) : (
                <View style={{ 
                  width: 28, 
                  height: 28, 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: 4 
                }} />
              ))}
              {focused && (
                <View style={{
                  position: 'absolute',
                  bottom: -12,
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#4CAF50',
                }} />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}