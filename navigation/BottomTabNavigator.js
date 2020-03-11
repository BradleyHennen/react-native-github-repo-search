import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import FeedScreen from '../screens/FeedScreen';
import {View, TouchableOpacity, Text} from 'react-native';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function TabBar({state, descriptors, navigation}) {

    return (
        <View style={{flexDirection: 'row'}}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const {tabBarIcon} = options;

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        key={index}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {tabBarIcon(isFocused)}
                            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                                {label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default function BottomTabNavigator({navigation, route}) {
    navigation.setOptions({
        headerTitle: getHeaderTitle(route)
    });

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBar={props => <TabBar {...props} />}>
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Get Started',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-code-working"/>,
                }}
            />
            <BottomTab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    title: 'GitHub Repos',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-albums"/>,
                }}
            />
            <BottomTab.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    title: 'Resources',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book"/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'How to get started';
        case 'Links':
            return 'Links to learn more';
        case 'Feed':
            return 'GitHub Repo List'
    }
}
