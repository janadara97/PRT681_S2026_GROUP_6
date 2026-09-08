using Task;

public interface ITaskRepository
{
  public List<TaskItem> GetAll();
  public void Add(TaskItem item);
  public void Update (TaskItem item);
  public void Delete (int id);
  public TaskItem GetById(int id);
}