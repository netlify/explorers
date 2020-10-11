import RadarChart from 'react-svg-radar-chart';
import { useUserState } from 'src/context/user';

function UserRadar() {
  const { userdata } = useUserState();

  const captions = {
    // columns
    jamstack: 'Jamstack',
    react: 'React',
    vue: 'Vue',
    angular: 'Angular',
    netlify: 'Netlify',
  };

  return (
    <div className="radar">
      <svg
        width="1"
        height="1"
        viewBox="-200 -200 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="Gradient" gradientTransform="rotate(90)">
            <stop offset="15%" stopColor="white" />
            <stop offset="65%" stopColor="black" />
          </linearGradient>
          <mask id="Mask">
            <rect
              x="-100"
              y="-200"
              width="100%"
              height="100%"
              fill="url(#Gradient)"
            />
          </mask>
        </defs>
      </svg>

      <RadarChart captions={captions} data={userdata.skills} size={250} />
    </div>
  );
}

export default UserRadar;
