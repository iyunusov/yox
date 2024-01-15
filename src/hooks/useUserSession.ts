import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from '@/lib/firebase/auth';

export function useUserSession(initialUser?: User) {
	// The initialUser comes from the server via a server component
	const [user, setUser] = useState<User |  null>(initialUser || null);
	const router = useRouter()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((authUser) => {
			setUser(authUser)
		})

		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		onAuthStateChanged((authUser) => {
			if (user === undefined) return

			// refresh when user changed to ease testing
			if (user?.phoneNumber !== authUser?.phoneNumber) {
				router.refresh()
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return user;
}