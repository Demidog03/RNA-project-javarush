import 'react-native-reanimated';
import {
    createStaticNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/home/HomeScreen";
import DetailsScreen from "@/app/screens/details/DetailsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {AuthContext, useIsSignedIn} from "@/app/context/AuthContext";


const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
            if: useIsSignedIn,
        },
    }
});

// const RootTabs = createBottomTabNavigator({
//     screenOptions: {
//         tabBarActiveTintColor: 'red',
//         headerTintColor: 'blue',
//         headerTitleStyle: {
//             fontWeight: 'bold'
//         }
//     },
//     screens: {
//         Home: {
//             screen: HomeScreen,
//             options: {
//                 headerTintColor: 'red',
//                 tabBarLabel: 'Home',
//                 tabBarIcon: ({ color, size }) => (
//                     <Ionicons name="home" color={color} size={size} />
//                 )
//             }
//         },
//         Details: {
//             if: useIsSignedIn,
//             screen: DetailsScreen,
//             options: {
//                 tabBarLabel: 'Details',
//                 tabBarIcon: ({ color, size }) => (
//                     <Ionicons name="bag" color={color} size={size} />
//                 )
//             }
//         },
//     }
// })

const Navigation = createStaticNavigation(RootStack)

export default function App() {
    return (
        <AuthContext value={{ isAuthenticated: true }}>
            <Navigation />
        </AuthContext>
    );
}
