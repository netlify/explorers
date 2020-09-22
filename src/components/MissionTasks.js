function MissionTasks({ tasks }) {
  return (
    <div className="mission-tasks">
      <ul>
        {tasks.map((task, index) => (
          <ListItem key={index} value={task} />
        ))}
      </ul>
    </div>
  );
}

export default MissionTasks;
