import React from "react";
import { useLocalSearchParams } from "expo-router";

import CommonApplicationDashboard from "@/components/dashboards/CommonDashboard";
import { APPLICATIONS } from "@/components/AppList";


export default function ApplicationDashboard() {
    const { id } = useLocalSearchParams<{
        id: string;
    }>();

    const application =
        APPLICATIONS.find(
            (item) => item.id === id
        ) || APPLICATIONS[0];

    return (
        <CommonApplicationDashboard
            application={application}
        />
    );
}