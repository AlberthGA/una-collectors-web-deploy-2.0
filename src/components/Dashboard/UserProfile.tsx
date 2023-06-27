import Image from "next/image";
import LogoutButton from "./LogoutButton";

interface UserProfileProps {
  name: string;
  role: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, role }) => {

  type Roles = {
    [key: string]: string;
  };

  const roles: Roles = {
    '2c5a073d-e3bd-446a-b35e-4aa4634a61ab': 'Administrativo',
    '': 'Recopilador',
    '00000000-0000-0000-0000-000000000000': 'Rol no asignado',
  };

  return (
    <div className="flex items-center bg-navigationColor rounded-md p-3">
      <div className="relative rounded-full overflow-hidden w-12 h-12 flex-shrink-0">
        <Image src="/images/user.png" alt="me" width="48" height="48" />
      </div>
      <div className="ml-3">
        <div className="font-bold text-gray-100">{name}</div>
        <div className="text-gray-100 text-sm">{roles[role]}</div>
      </div>
      <div className="ml-1">
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserProfile;
