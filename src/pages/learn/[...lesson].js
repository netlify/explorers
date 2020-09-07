import { useRouter } from 'next/router';

const Lesson = () => {
  const router = useRouter();
  const { asPath } = router;

  return <p>Lesson: {asPath}</p>;
};

export default Lesson;
