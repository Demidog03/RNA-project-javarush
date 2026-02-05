import {render} from "@testing-library/react-native";
import {ReactElement} from "react";
import {Provider} from "react-redux";
import {persistor, store} from "@/app/store/store";
import {PersistGate} from "redux-persist/integration/react";

export function renderWithProviders(ui: ReactElement) {
    return render(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {ui}
            </PersistGate>
        </Provider>
    )
}