import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/navigation';
import msalInstance from '@/pages/api/auth/msalInstance';

function LogoutButton() {

  const router = useRouter();

  const handleLogout = async () => {
    await msalInstance.logoutPopup().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/login');
    })
  };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <span className="rounded-md shadow-sm">
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-navigationColor rounded-md hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 14l-5-5h10l-5 5z" />
                </svg>
              </Menu.Button>
            </span>

            { }
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        <LogoutIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Cerrar sesión
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}

export default LogoutButton;
