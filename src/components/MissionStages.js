function MissionStages({ stages }) {
  return (
    <div className="mission-stages">
      <ul>
        {stages.map((stage, index) => (
          <ListItem key={index} value={stage} />
        ))}
      </ul>
    </div>
  );
}

export default MissionStages;
