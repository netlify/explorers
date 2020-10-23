import styles from './MissionTracker.module.css';
import React, { useState } from 'react';
import Link from 'next/link';

function MissionTracker({ currentMission, currentStage, stages }) {
  const [tasks, setTasks] = useState([...stages]);
  const num1 = [32];
  const num2 = [15];

  const updateDoneTasks = (index) => () => {
    let tasksCopy = [...tasks];
    tasksCopy[index].done = !tasksCopy[index].done;
    setTasks(tasksCopy);
  };

  const taskTextStyles = (task) => {
    const baseStyles = `${styles['tracker-select']} ${styles['task-label']}`;

    if (currentStage === task.slug.current) {
      return baseStyles + ` ${styles['is-current-task']}`;
    } else {
      return baseStyles;
    }
  };

  return (
    <div className={styles.container}>
      <section>
        {tasks.map((task, index) => (
          <div
            key={`mt-${task.slug}-${index}`}
            className={taskTextStyles(task)}
          >
            <Link href={`/learn/${currentMission}/${task.slug.current}`}>
              {task.title}
            </Link>
          </div>
        ))}
      </section>

      <section>
        <svg
          viewBox={`0 0 30 ${tasks.length * 50}`}
          className={styles['tracker-svg']}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          stroke="currentColor"
          fill="white"
          aria-labelledby="timeline"
          role="presentation"
        >
          <title id="timeline">timeline element</title>

          <line x1="10" x2="10" y1={num2} y2={tasks.length * num1 - num2} />
          {tasks.map((task, index) => (
            <circle
              key={task.name}
              onClick={updateDoneTasks(index)}
              cx="10"
              r="4"
              cy={index * +num1 + +num2}
              fill={task.done ? 'currentColor' : 'black'}
              className={styles['tracker-select']}
            />
          ))}
        </svg>
      </section>
    </div>
  );
}

export default MissionTracker;
