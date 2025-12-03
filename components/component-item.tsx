import { ComponentItemType } from "@/config/items";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/shadcnButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const ComponentItem = ({ component }: { component: ComponentItemType }) => {
    const Icon = component.icon;
    return (
        <Card
            key={component.name}
            className="relative overflow-hidden hover:shadow-lg transition-shadow"
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                    {component.badge && (
                        <Badge variant="secondary">{component.badge}</Badge>
                    )}
                </div>
                <CardTitle className="mt-4">{component.name}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
                <Button asChild size="sm" className="w-full ">
                    <Link href={component.href}>
                        View <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default ComponentItem;
