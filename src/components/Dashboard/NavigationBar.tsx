import { useRouter } from 'next/navigation';
import HomeButton from './HomeButton';
import UserProfile from './UserProfile';
import { useEffect, useState } from 'react';
interface User {
  principalDisplayName: string;
  appRoleId: string;
}

const NavigationBar = () => {

  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userJson = JSON.parse(localStorage.getItem('user') || '{}');
    if (userJson && userJson.value && userJson.value.length) {
      setLoggedIn(true);
      setUser(userJson.value[0]);
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <nav className="top-0 z-50 w-full bg-navigationColor border-gray-200 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <HomeButton />
            <p className="text-2xl bg- ml-6 text-orange-50">Municipalidad de Perez Zeledón</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <UserProfile
                name={user?.principalDisplayName ?? ''}
                role={user?.appRoleId ?? ''}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar;