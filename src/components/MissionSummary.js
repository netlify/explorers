function MissionSummary({ title, description }) {
  return (
    <div className="mission-summary">
      <div className="mission-title">
        <h2>{title}</h2>
      </div>
      <div className="mission-description">
        <p>{description}</p>
      </div>
    </div>
  )
}

export default MissionSummary