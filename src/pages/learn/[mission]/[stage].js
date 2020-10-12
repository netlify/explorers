export default function Stage(props) {
  return <p>stage: {JSON.stringify(props)}</p>;
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
