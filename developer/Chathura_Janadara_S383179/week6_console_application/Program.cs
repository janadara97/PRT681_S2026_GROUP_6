
using Data;
using Task;
class Program
{
  static void Main(string[] args)
  {
    string password = "Password123?";

   string masterConnectionString =
    $"Server=localhost,1433;" +
    $"Database=master;" +
    $"User Id=sa;" +
    $"Password={password};" +
    $"Encrypt=True;" +
    $"TrustServerCertificate=True;";

string databaseConnectionString =
    $"Server=localhost,1433;" +
    $"Database=TaskManagerDB;" +
    $"User Id=sa;" +
    $"Password={password};" +
    $"Encrypt=True;" +
    $"TrustServerCertificate=True;";

    var connectionFactory = new DatabaseConnectionFactory(databaseConnectionString);

    try
    {
      var initilizier = new DatabaseInitilizer(masterConnectionString,databaseConnectionString,connectionFactory);
      initilizier.Initializedatabase();
      initilizier.CreateTable();
      Console.WriteLine("Database ready.");
    } catch(Exception ex)
    {
      Console.WriteLine($"Database initialization failed: {ex.Message}");
        return; // Stop the app if we have no database
    }
    TaskRepository taskRepository = new TaskRepository(connectionFactory);
    TaskService taskService = new TaskService(taskRepository);


while (true)
{
    Console.WriteLine();
    Console.WriteLine("=========================");
    Console.WriteLine("      TASK MANAGER");
    Console.WriteLine("=========================");

    Console.WriteLine("1. Add Task");
    Console.WriteLine("2. View Tasks");
    Console.WriteLine("3. Complete Task");
    Console.WriteLine("4. Delete Task");
    Console.WriteLine("5. Exit");

    Console.WriteLine();

    Console.Write("Select an option: ");

    string choice =
        Console.ReadLine() ?? "";

    Console.WriteLine();

    switch (choice)
    {
        case "1":
            AddTask();
            break;

        case "2":
            ViewTasks();
            break;

        case "3":
            CompleteTask();
            break;

        case "4":
            DeleteTask();
            break;

        case "5":
            Console.WriteLine("Goodbye!");
            return;

        default:
            Console.WriteLine("Invalid option.");
            break;
    }
}


void AddTask()
{

  Console.Write("Enter task title: ");
    string title =
        Console.ReadLine() ?? "";

    Console.Write("Enter description: ");
    string description =
        Console.ReadLine() ?? "";

    Console.Write("Enter Work Type 1) Work Related 2) Famili Related: ");
    string type =
        Console.ReadLine() ?? "";

    if (string.IsNullOrWhiteSpace(title))
    {
      Console.WriteLine("Title cannot be empty.");
      return;
    }
    if(type == "1")
{
    TaskItem item = new WorkTask
    {
        Title = title,
        Description = description
    };
    item.PrintDetails();
    taskService.AddTask(item); 
}
else
{
    TaskItem item = new FamilyTask
    {
        Title = title,
        Description = description
    };
    item.PrintDetails();
    taskService.AddTask(item);
}
    

}


void ViewTasks()
{
    List<TaskItem> tasks =
        taskService.GetTasks();

    if (tasks.Count == 0)
    {
        Console.WriteLine("No tasks found.");
        return;
    }

    Console.WriteLine("TASKS");
    Console.WriteLine("---------------------------------------------");

    foreach (TaskItem task in tasks)
    {
        string status =
            task.IsComplete
                ? "Completed"
                : "Pending";

        Console.WriteLine(
            $"{task.Id}. {task.Title}"
        );

        Console.WriteLine(
            $"   Description: {task.Description}"
        );

        Console.WriteLine(
            $"   Type: {task.TaskType}"
        );

        Console.WriteLine(
            $"   Status: {status}"
        );

        Console.WriteLine();
    }
}


void CompleteTask()
{
    ViewTasks();

    Console.Write("Enter task ID to complete: ");

    if (!int.TryParse(
            Console.ReadLine(),
            out int id))
    {
        Console.WriteLine("Invalid ID.");
        return;
    }

    taskService.CompleteTask(id);

    Console.WriteLine(
        "Task marked as completed."
    );
}


void DeleteTask()
{
    ViewTasks();

    Console.Write("Enter task ID to delete: ");

    if (!int.TryParse(
            Console.ReadLine(),
            out int id))
    {
        Console.WriteLine("Invalid ID.");
        return;
    }

    taskService.DeleteTask(id);

    Console.WriteLine(
        "Task deleted successfully."
    );
}
  }
}
