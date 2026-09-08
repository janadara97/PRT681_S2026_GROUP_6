namespace Task
{

public abstract class TaskItem
{
  public int Id {get; set;}
  public string Title {get; set;} = "";
  public string Description {get; set;} = "";
  public bool IsComplete {get; set;}
  public abstract string TaskType {get;}

  public void Complete()
    {
      this.IsComplete = true;
    }
  public abstract void PrintDetails();
}
}
