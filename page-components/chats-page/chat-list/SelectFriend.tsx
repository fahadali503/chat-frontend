import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
    name: string;
}
export const SelectFriend = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, name, ...others }: ItemProps, ref) => (
        <div ref={ref} key={label} {...others}>
            <Group noWrap>
                <Avatar src={image} />

                <div>
                    <Text size="sm">{label}</Text>
                    <Text size="xs" opacity={0.65}>
                        {name}
                    </Text>
                </div>
            </Group>
        </div>
    )
);