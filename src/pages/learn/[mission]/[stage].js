import dynamic from 'next/dynamic';
import MissionTracker from '@components/MissionTracker';

const VideoPlayer = dynamic(() => import('@components/VideoPlayer'), {
  ssr: false,
  loading: () => <p>some skeleton sarah will make all pretty</p>,
});

export default function Stage(props) {
  return (
    <>
      <p>stage: {JSON.stringify(props)}</p>
      <VideoPlayer />
      <MissionTracker />
    </>
  );
}

export function getStaticProps({ ...ctx }) {
  return {
    props: {
      ctx,
    },
  };
}

export function getStaticPaths() {
  // TODO build this array of paths
  return {
    paths: ['/learn/gatsby/one'],
    fallback: false,
  };
}
