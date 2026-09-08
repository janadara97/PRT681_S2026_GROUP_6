// using Microsoft.Data.SqlClient;
// using Task;
// public class Database
// {
//   private const string _password = "Password123?";
//   private static readonly string MasterConnectionString =
//     $"Server=localhost,1433;" +
//     $"Database=master;" +
//     $"User Id=sa;" +
//     $"Password={_password};" +
//     $"Encrypt=True;" +
//     $"TrustServerCertificate=True;";

//     private static readonly string ConnectionString =
//         $"Server=localhost,1433;" +
//         $"Database=TaskManagerDB;" +
//         $"User Id=sa;" +
//         $"Password={_password};" +
//         $"Encrypt=True;" +
//         $"TrustServerCertificate=True;";

//     public static void Initializedatabase()
//   {
//     var connection = new SqlConnection(MasterConnectionString);
//     connection.Open();

//     string sql = 
//     """
//     IF DB_ID('TaskManagerDB') IS NULL
//     BEGIN
//       CREATE DATABASE TaskManagerDB;
//     END
//     """;
//     var command = new SqlCommand(sql,connection);
//     command.ExecuteNonQuery();
//   }

//   public static void CreateTable()
//   {
//     var connection = new SqlConnection(ConnectionString);
//     connection.Open();

//     String sql = 
//     """
//     IF OBJECT_ID('Tasks', 'U') IS NULL
//     BEGIN
//       CREATE TABLE Tasks
//       (
//         Id INT IDENTITY(1,1) PRIMARY KEY,
//         Title VARCHAR(200) NOT NULL,
//         Description VARCHAR(750) NOT NULL,
//         IsComplete BIT NOT NULL DEFAULT 0,
//       );
//     END
//     """;

//     var command = new SqlCommand(sql,connection);
//     command.ExecuteNonQuery();
//   }

//   public static void AddTask (string name, string description)
//   {
//     var connection = new SqlConnection(ConnectionString);
//     connection.Open();

//     string sql = 
//     """
//     INSERT INTO Tasks (Title,Description,IsComplete)
//     VALUES (@Title,@Description,0);
//     """;

//     var command = new SqlCommand(sql, connection);
//     command.Parameters.AddWithValue("@Title",name);
//     command.Parameters.AddWithValue("@Description",description);

//     command.ExecuteNonQuery();
//   }

//   public static List<TaskItem> GetTasks()
//   {
//     var tasks = new List<TaskItem>();
//     var connection = new SqlConnection(ConnectionString);
//     connection.Open();

//     string sql = 
//     """
//     SELECT * FROM TASKS ORDER BY Id;
//     """;

//     var command = new SqlCommand(sql,connection);
//     var reader = command.ExecuteReader();

//     while (reader.Read())
//     {
//       var task = new TaskItem
//       {
//         Id=reader.GetInt32(0),
//         Title = reader.GetString(1),
//         Description = reader.GetString(2),
//         IsComplete = reader.GetBoolean(3)
//       };
//       tasks.Add(task);
//     }
//     return tasks;
//   }

//   public static void CompleteTask(int id)
// {
//     using var connection =
//         new SqlConnection(ConnectionString);

//     connection.Open();

//     string sql =
//         """
//         UPDATE Tasks
//         SET IsCompleted = 1
//         WHERE Id = @Id;
//         """;

//     using var command =
//         new SqlCommand(sql, connection);

//     command.Parameters.AddWithValue("@Id", id);

//     command.ExecuteNonQuery();
// }

// public static void DeleteTask(int id)
// {
//     using var connection =
//         new SqlConnection(ConnectionString);

//     connection.Open();

//     string sql =
//         """
//         DELETE Tasks
//         WHERE Id = @Id;
//         """;

//     using var command =
//         new SqlCommand(sql, connection);

//     command.Parameters.AddWithValue("@Id", id);

//     command.ExecuteNonQuery();
// }
// }