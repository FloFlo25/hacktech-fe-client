import { type Dispatch, type SetStateAction } from "react";
import { type UserType } from "~/types/user";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type Props = {
	userType: UserType;
	setUserType: Dispatch<SetStateAction<UserType>>;
};

const UserSelector = ({ setUserType, userType }: Props) => {
	const handleOnValueChange = (value: string) => {
		setUserType(value as UserType);
	};

	return (
		<Select onValueChange={handleOnValueChange} defaultValue={userType}>
			<SelectTrigger className="absolute left-2 top-2 w-[180px]">
				<SelectValue placeholder="User Type" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="hr">HR</SelectItem>
				<SelectItem value="user">User</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default UserSelector;
