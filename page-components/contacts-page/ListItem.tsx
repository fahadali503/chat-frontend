import { RootState } from "@/store";
import { IUser } from "@/types/user.types";
import { Avatar, Button, Group, Text } from "@mantine/core";
import { IconUserCheck } from "@tabler/icons-react";
import { useSelector } from "react-redux";

type Props = {
    item: IUser;
    buttonColor: "red" | "blue";
    buttonText: string;
    onClick: () => void;
}

export function ListItemComponent({ item, buttonColor, buttonText, onClick }: Props) {
    const authState = useSelector((state: RootState) => state.auth);
    return <tr>
        <td>
            <Group position="center" spacing="sm">
                <Avatar size={40} radius={40} >{item.email.slice(0, 2).toUpperCase()}</Avatar>
                <div>
                    <Text fz="md" c="dimmed">
                        {item.email}
                    </Text>
                </div>
            </Group>
        </td>
        <td>
            {authState.user!.friends.includes(item._id) ? <IconUserCheck size={35} className="text-blue-400" /> :
                <Button onClick={onClick} color={buttonColor} className={`${buttonColor === "red" ? "bg-red-400" : "bg-blue-400"} rounded-full`}>{buttonText}</Button>
            }
        </td>
    </tr>
}