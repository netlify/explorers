import { sanityQuery } from '../util/sanity';

const MissionsStateContext = React.createContext();
const MissionsUpdateContext = React.createContext();

export const loadMissions = async () => {
  const data = await sanityQuery({
    query: `
      {
        allMission {
          _id
          title
          blurb
          description
          slug {
            current
          }
          coverImage {
            asset {
              url
            }
          }
          stages {
            title
            slug {
              current
            }
          }
          instructor {
            name
            avatar {
              asset {
                url
              }
            }
          }
        }
      }
    `,
  });

  return data.allMission;
};

export const loadMissionBySlug = async (slug) => {
  const data = await sanityQuery({
    query: `
      query ($slug: String!) {
        allMission(where: { slug: { current: { eq: $slug }}}) {
          _id
          title
          description
          slug {
            current
          }
          stages{
            _id
            title
            slug {
              current
            }
          }
        }
      }
    `,
    variables: { slug },
  });

  const [mission] = data.allMission;

  return mission;
};

export function MissionsProvider({ children }) {
  const [missions, setMissions] = React.useState([]);

  React.useEffect(() => {
    loadMissions().then((missions) => {
      setMissions(missions);
    });
  }, []);

  const state = {
    missions,
    getMissionBySlug: (slug) =>
      missions.find((mission) => mission.slug.current === slug),
  };

  const updateFns = {
    // if we need to modify the missions, register those functions here
  };

  return (
    <MissionsStateContext.Provider value={state}>
      <MissionsUpdateContext.Provider value={updateFns}>
        {children}
      </MissionsUpdateContext.Provider>
    </MissionsStateContext.Provider>
  );
}

export function useMissionsState() {
  const state = React.useContext(MissionsStateContext);

  if (state === undefined) {
    throw new Error('useMissionsState must be used within a MissionsProvider');
  }

  return state;
}

export function useMissionsUpdate() {
  const updateFns = React.useContext(MissionsUpdateContext);

  if (updateFns === undefined) {
    throw new Error('useMissionsUpdate must be used within a MissionsProvider');
  }

  return updateFns;
}
