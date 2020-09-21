import { useRouter } from 'next/router';

// /learn/{mission-name}/{lesson-name}
// /learn/{mission-name}
// /learn/{lesson-name}

const Lesson = () => {
  const router = useRouter();
  const { asPath } = router;

  return <p>Lesson: {asPath}</p>;
};

export default Lesson;
