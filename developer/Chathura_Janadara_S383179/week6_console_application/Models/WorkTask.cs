using Task;

public class WorkTask : TaskItem
{
  public override string TaskType => "Work";
  public override void PrintDetails()
  {
    Console.WriteLine("Printing the work detailss");
  }
}