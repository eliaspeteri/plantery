import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    Cookies.remove('session');
    let timer = setTimeout(() => router.push('/'), 10000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div>
      You&apos;re now logged out. Hope we see you soon again!
      <br />
      <Link href='/'>
        <a>Click here to go back to homepage.</a>
      </Link>
    </div>
  );
};

export default LogoutPage;
