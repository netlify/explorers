import { sanityQuery } from '@util/sanity';

const StagesStateContext = React.createContext();
const StagesUpdateContext = React.createContext();

export const loadStageBySlug = async (slug) => {
  const data = await sanityQuery({
    query: `
      query ($slug: String!) {
        allStage(where: { slug: { current: { eq: $slug }}}) {
          title
          slug {
            current
          }
          content {
            ... on Video {
              cloudinaryVideo {
                public_id
              }
            }
          }
        }
      }
    `,
    variables: { slug },
  });

  const [stage] = data.allStage;

  return stage;
};

export function StagesProvider({ children }) {
  const [stages, setStages] = React.useState([]);

  /*
   */

  React.useEffect(() => {
    fetch('/api/get-stage-data')
      .then((response) => response.json())
      .then((stages) => {
        setStages(stages);
      });
  }, []);

  const state = {
    stages,
    getStageByMission: (mission) =>
      stages.find((stage) => stage.mission === mission),
  };

  const updateFns = {
    testInfo: true,
  };

  return (
    <StagesStateContext.Provider value={state}>
      <StagesUpdateContext.Provider value={updateFns}>
        {children}
      </StagesUpdateContext.Provider>
    </StagesStateContext.Provider>
  );
}

export function useStagesState() {
  const state = React.useContext(StagesStateContext);

  if (state === undefined) {
    throw new Error('useStagesState must be used within StatesProvider');
  }

  return state;
}

export function useStagesUpdate() {
  const updateFns = React.useContext(StagesUpdateContext);

  if (state === undefined) {
    throw new Error('usesStagesState must be used within StatesProvider');
  }

  return updateFns;
}
