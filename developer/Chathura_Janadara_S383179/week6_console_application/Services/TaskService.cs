using System;
using System.Collections.Generic;
using Data;
using Task;
public class TaskService
{
    private readonly ITaskRepository _repository;

    public TaskService(ITaskRepository repository)
    {
        _repository = repository;
    }

    public List<TaskItem> GetTasks()
    {
        return _repository.GetAll();
    }

    public void AddTask(TaskItem task)
    {
        if (task == null) 
            throw new ArgumentNullException(nameof(task));
            
        if (string.IsNullOrWhiteSpace(task.Title)) 
            throw new ArgumentException("Task title cannot be empty.");

        _repository.Add(task);
    }

    public void CompleteTask(int id)
    {
        TaskItem? task = _repository.GetById(id);
        
        if (task == null) 
            throw new Exception("Task not found.");

        task.Complete();
        
        _repository.Update(task);
    }

    public void UpdateTask(TaskItem task)
    {
        if (task == null) 
            throw new ArgumentNullException(nameof(task));

        _repository.Update(task);
    }

    public void DeleteTask(int id)
    {
        _repository.Delete(id);
    }
}