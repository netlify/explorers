import Link from 'next/link';

const FourOhFour = () => {
  return (
    <div>
      <h1>404</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </div>
  );
};

export default FourOhFour;
