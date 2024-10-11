import Link from 'next/link';

import { PATH } from '@/constants';

const Header = () => (
  <header className="sticky top-0 z-[3] mb-3 w-full border-b border-gray-100 bg-white px-3 py-4">
    <div className="m-auto max-w-5xl">
      <h2>
        <Link href={PATH.HOME}>Home</Link>
      </h2>
    </div>
  </header>
);

export default Header;
