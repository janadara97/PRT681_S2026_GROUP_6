using Task;

public class FamilyTask : TaskItem
{
  public override string TaskType => "Family";
  public override void PrintDetails()
  {
    Console.WriteLine("This is a Family Task");
  }
}