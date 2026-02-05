import {JSX, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {getProfileThunk} from "@/app/store/thunks/authThunks";
import {
    useNavigation,
} from '@react-navigation/native';
import {Text, View} from "react-native";

function AuthGuard({ children }: { children: JSX.Element }) {
    const { token, profile, getProfilePending, loginPending } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { navigate } = useNavigation();

    console.log(getProfilePending, loginPending);

    useEffect(() => {
        if (token) {
            dispatch(getProfileThunk(token))
        }
    }, [token])

    useEffect(() => {
        console.log(profile)
    }, [profile])

    if (getProfilePending || loginPending) {
        return <View style={{ padding: 40 }}><Text>LOADING...</Text></View>
    }

    if (!token || !profile) {
        navigate('Login' as never)
        return
    }

    return children
}

export default AuthGuard;