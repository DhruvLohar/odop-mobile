import { ReactNode } from "react";
import { useSession } from "~/lib/auth";

export default function WithRole(
    { role, children }: { role: 'user' | 'artisan', children: ReactNode }
) {
    
    const { session } = useSession()

    return (session?.role === role) ? children : null;

}