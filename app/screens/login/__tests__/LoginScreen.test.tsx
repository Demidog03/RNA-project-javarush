import {render} from "@testing-library/react-native";
import LoginScreen from "@/app/screens/login/LoginScreen";
import {renderWithProviders} from "@/app/utils/test-utils";

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
    })
}))

describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should render login form correctly', () => {
        const { getByPlaceholderText, getByText } = renderWithProviders(<LoginScreen/>)

        const loginText = getByText('Login');
        const emailInput = getByPlaceholderText('Enter email')
        const passwordInput = getByPlaceholderText('Enter password')
        const submitButton = getByText('Submit')

        expect(loginText).toBeTruthy()
        expect(emailInput).toBeTruthy()
        expect(passwordInput).toBeTruthy()
        expect(submitButton).toBeTruthy()
    })
})