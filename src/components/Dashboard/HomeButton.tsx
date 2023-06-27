import Image from 'next/image';
import { useRouter } from 'next/navigation';

function HomeButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/collectors');
  };

  return (
    <button onClick={handleClick}>
      <Image src="/images/icon.png" alt="me" width="48" height="48" />
    </button>
  );
}

export default HomeButton;
