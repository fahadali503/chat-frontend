import { IUser } from "@/types/user.types";
import { Avatar, Group, Indicator } from "@mantine/core";
import {
    IconSearch, IconVideo,
    IconPhoneCall, IconInfoCircleFilled,
    IconDotsVertical
} from '@tabler/icons-react';

type Props = {
    friend: IUser;
}
export function ChatHeaderComponent({ friend }: Props) {

    return <div className="absolute shadow-sm h-24 w-full bg-[#F2F2F2] opacity-85 top-0 z-10">
        <Group position="apart" align="center" className="px-8 h-full items-center">
            {/* User Info */}
            <Group>
                <Indicator inline size={15} offset={9} position="bottom-end" color="green" withBorder>
                    <Avatar size="lg" radius="xl" >{friend.email[0]}</Avatar>
                </Indicator>
                <div>
                    <p className="font-medium text-lg tracking-wider text-gray-600">{friend.email}</p>
                    <p className="font-medium text-xs pt-1 tracking-wider text-gray-600">Active</p>
                </div>
            </Group>
            {/* Options */}
            <Group spacing={"lg"}>
                <IconSearch className="text-[#646d75] cursor-pointer" />
                <IconPhoneCall className="text-[#646d75] cursor-pointer" />
                <IconVideo className="text-[#646d75] cursor-pointer" />
                <IconInfoCircleFilled className="text-[#646d75] cursor-pointer" />
                <IconDotsVertical className="text-[#646d75] cursor-pointer" />
            </Group>
        </Group>
    </div>
}