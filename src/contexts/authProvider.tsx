import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { UserInfo } from "../models/userInfoModel";

interface AuthContextType {
	user: UserInfo;
	setUser: Dispatch<SetStateAction<UserInfo>>;
}

const AuthContext = createContext<AuthContextType>({
	user: {
		accessToken: "",
		username: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
	},
	setUser: () => {},
});

export const AuthProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [user, setUser] = useState({
		accessToken: "",
		username: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
	});

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
