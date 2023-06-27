"use client"
import { useRouter } from 'next/navigation';
import msalInstance, { loginRequest, makeApiCall } from '@/pages/api/auth/msalInstance';

function RegisterButton() {

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await msalInstance.loginRedirect({ ...loginRequest, loginHint: 'signInName@contoso.com', prompt: 'select_account', authority: 'https://login.microsoftonline.com/common', scopes: ['openid', 'profile'] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center'>
      <button onClick={handleSignUp} className="bg-green-700 py-2 px-8 hover:bg-green-800 text-white font-bold rounded flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="32" height="32"
          viewBox="0 0 48 48">
          <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path>
        </svg>
        <span>Regístrate con Microsoft</span>
      </button>
    </div>
  );
}

export default RegisterButton;
