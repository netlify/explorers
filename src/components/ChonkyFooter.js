import styles from './ChonkyFooter.module.css';
import { useUserState } from '@context/user';
import FloatingAstronaut from '@components/FloatingAstronaut';

export default function Layout({ mission, currentStage }) {
  const { user } = useUserState();
  const missionTotal =
    mission.stages && mission.stages.length ? mission.stages.length : 1;

  const currentMission = () => {
    if (!mission.stages) return 0;
    return mission.stages.findIndex((el) => {
      return el.slug.current === currentStage;
    });
  };

  const missionProgress = () => {
    const progressDecimal = user.activity.userMissions?.find(
      (userMission) => userMission.title === mission.title
    ).progress;

    return `${Math.ceil(progressDecimal * 100)}%`;
  };

  const progressIndicator = () => {
    if (currentStage) {
      return (
        <div className={styles.progress}>
          <h3>Current Stage</h3>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="100"
            viewBox="0 0 300 100"
          >
            <g fill="white">
              <line
                x1="20"
                x2="20"
                y1="3"
                y2="80"
                stroke="currentColor"
                strokeWidth="2"
              />
              <text x="50" y="40" fontSize="50px">
                {currentMission() + 1}
              </text>
              <line
                x1="110"
                x2="60"
                y1="3"
                y2="80"
                stroke="currentColor"
                strokeWidth="1"
              />
              <text x="90" y="70" fontSize="30px">
                {missionTotal}
              </text>
              <line
                x1="140"
                x2="140"
                y1="3"
                y2="80"
                stroke="currentColor"
                strokeWidth="2"
              />
              <text x="150" y="40" fontSize="50px">
                {missionProgress()}
              </text>
              <text x="150" y="70" fontSize="25px">
                Complete
              </text>
            </g>
          </svg>
        </div>
      );
    }
  };

  return (
    <section>
      <div className={`${styles.chonky} section-contain`}>
        <p className={styles.explorers}>Explorers</p>
        <div className={styles.astronaut}>
          <FloatingAstronaut />
        </div>
        {progressIndicator()}
      </div>
    </section>
  );
}
