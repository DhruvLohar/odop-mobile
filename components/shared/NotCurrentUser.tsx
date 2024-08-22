import { ReactNode } from 'react';
import { useSession } from '~/lib/auth';

export default function NotCurrentUser({
    checkID,
    children,
}: {
    checkID: number;
    children: ReactNode;
}) {
    const { session } = useSession();

    return session?.id !== checkID ? children : null;
}
