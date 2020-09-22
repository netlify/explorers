const MissionsStateContext = React.createContext();
const MissionsUpdateContext = React.createContext();

export function MissionsProvider({ children }) {
  const [missions, setMissions] = React.useState([]);

  React.useEffect(() => {
    fetch('/.netlify/functions/get-mission-data')
      .then((response) => response.json())
      .then((missions) => {
        setMissions(missions);
      });
  }, []);

  const state = {
    missions,
    getMissionBySlug: (slug) =>
      missions.find((mission) => mission.slug === slug),
  };

  const updateFns = {
    donuts: true,
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
