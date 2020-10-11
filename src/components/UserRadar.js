import RadarChart from 'react-svg-radar-chart';

function UserRadar() {
    const data = [
      {
        data: {
          jamstack: 0.4,
          react: .65,
          vue: 0.9,
          angular: 0.67,
          netlify: 0.8
        },
        meta: { color: 'rgba(255, 68, 149, 0.7)' }
      },
      {
        data: {
          jamstack: 1,
          react: .9,
          vue: 0.5,
          angular: 0.6,
          netlify: 0.7
        },
        meta: { color: 'rgba(170, 77, 232, 0.7)' }
      }
    ];
 
    const captions = {
      // columns
      jamstack: 'Jamstack',
      react: 'React',
      vue: 'Vue',
      angular: 'Angular',
      netlify: 'Netlify'
    };
  
  return (
    <div className="radar">
      <svg width="1" height="1" viewBox="-200 -200 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="Gradient" gradientTransform="rotate(90)">
            <stop offset="15%" stopColor="white" />
            <stop offset="65%" stopColor="black" />
          </linearGradient>
          <mask id="Mask">
            <rect x="-100" y="-200" width="100%" height="100%" fill="url(#Gradient)"  />
          </mask>
        </defs>
      </svg>
    
      <RadarChart
        captions={captions}
        data={data}
        size={250}
        />
    </div>
  );
}

export default UserRadar;