import { useEffect, useState } from 'react';
import { Container, DeleteButton, Input, List, ListItem } from './todo.style';

export const Todo = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    // Chrome storage에서 기존 저장된 할 일 목록 불러오기
    chrome.storage.sync.get(['tasks'], (result) => {
      if (result.tasks) {
        setTasks(result.tasks);
      }
    });
  }, []);

  const addTask = () => {
    if (task.trim() !== '') {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      setTask('');

      // Chrome storage에 저장
      chrome.storage.sync.set({ tasks: newTasks });
    }
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);

    // Chrome storage에 저장
    chrome.storage.sync.set({ tasks: newTasks });
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask();
          }
        }}
      />
      <List>
        {tasks.map((t, index) => (
          <ListItem key={t}>
            <div>{t}</div>
            <DeleteButton onClick={() => deleteTask(index)}>X</DeleteButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
