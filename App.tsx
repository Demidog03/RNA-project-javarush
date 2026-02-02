import 'react-native-reanimated';
import {
    createStaticNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/home/HomeScreen";
import DetailsScreen from "@/app/screens/details/DetailsScreen";
import {Provider} from "react-redux";
import {persistor, store} from "@/app/store/store";
import TodosScreen from "@/app/screens/todos/TodosScreen";
import {PersistGate} from "redux-persist/integration/react";
import LoginScreen from "@/app/screens/login/LoginScreen";
import AuthGuard from "@/app/guards/AuthGuard";

function GuardedTodosScreen() {
    return (
        <AuthGuard>
            <TodosScreen />
        </AuthGuard>
    )
}

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Todos',
    screens: {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
        Todos: {
            screen: GuardedTodosScreen,
            options: {
                headerShown: false,
            }
        },
        Login: {
            screen: LoginScreen,
            options: {
                headerShown: false,
            }
        }
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
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Navigation />
            </PersistGate>
        </Provider>
    );
}
