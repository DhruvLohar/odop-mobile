import { View } from "react-native";
import { H2, H5, ScrollView, YStack } from "tamagui";
import ConnectionRequestCard from "~/components/custom/ConnectionRequestCard";
import connection from "~/lib/data/connectionrequest.json"

export default function connectionRequests() {
    return (
        <ScrollView flex={1} padding="$5">
                    <YStack flex={1} alignItems="center">
                        {connection.connection.map((connection) => (
                            <ConnectionRequestCard key={connection.id} {...connection} />
                        ))}
                    </YStack>
        </ScrollView>
    )
}