import { useRouter } from 'next/router';

const Misson = () => {
  const router = useRouter();
  const { asPath } = router;

  return <p>Misson: {asPath}</p>;
};

export default Misson;
