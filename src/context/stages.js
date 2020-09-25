const StagesStateContext = React.createContext();
const StagesUpdateContext = React.createContext();

export function StagesProvider({ children }) {
  const [stages, setStages] = React.useState([]);

  React.useEffect(() => {
    fetch('/.netlify/functions/get-stage-data')
      .then((response) => response.json())
      .then((stages) => {
        setStages(stages)
      });
  }, []);

  const state = {
    stages,
    getStageBySlug: (slug) =>
      stages.find((stage) => stage.slug === slug),
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
  )
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
    throw new Error('useStagesState must be used within StatesProvider');
  }

  return updateFns;
}
