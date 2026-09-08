using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Data;
using Task;

public class TaskRepository : ITaskRepository
{
    private readonly DatabaseConnectionFactory _connectionFactory;

    public TaskRepository(DatabaseConnectionFactory factory)
    {
        _connectionFactory = factory;
    }

    public List<TaskItem> GetAll()
    {
        var tasks = new List<TaskItem>();
        
        using var connection = _connectionFactory.CreateConnection();
        connection.Open();

        string sql = "SELECT Id, TaskType, Title, Description, IsComplete FROM Tasks ORDER BY Id;";

        using var command = new SqlCommand(sql, connection);
        using var reader = command.ExecuteReader();

        while (reader.Read())
        {
            tasks.Add(MapReaderToTask(reader));
        }
        
        return tasks;
    }

    public void Add(TaskItem item)
    {
        using var connection = _connectionFactory.CreateConnection();
        connection.Open();

        string sql = """
            INSERT INTO Tasks (TaskType, Title, Description, IsComplete) 
            VALUES (@TaskType, @Title, @Description, @IsComplete);
            """;

        using var command = new SqlCommand(sql, connection);
        
        command.Parameters.AddWithValue("@TaskType", item.TaskType);
        command.Parameters.AddWithValue("@Title", item.Title);
        command.Parameters.AddWithValue("@Description", item.Description);
        command.Parameters.AddWithValue("@IsComplete", item.IsComplete);
        
        command.ExecuteNonQuery();
    }

    public void Update(TaskItem item)
    {
        using var connection = _connectionFactory.CreateConnection();
        connection.Open();

        string sql = """
            UPDATE Tasks 
            SET Title = @Title, 
                Description = @Description, 
                IsComplete = @IsComplete 
            WHERE Id = @Id;
            """;

        using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@Id", item.Id);
        command.Parameters.AddWithValue("@Title", item.Title);
        command.Parameters.AddWithValue("@Description", item.Description);
        command.Parameters.AddWithValue("@IsComplete", item.IsComplete);
        
        command.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var connection = _connectionFactory.CreateConnection();
        connection.Open();

        string sql = "DELETE FROM Tasks WHERE Id = @Id;";

        using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@Id", id);
        
        command.ExecuteNonQuery();
    }

    public TaskItem? GetById(int id) 
    {
        using var connection = _connectionFactory.CreateConnection();
        connection.Open();

        string sql = "SELECT Id, TaskType, Title, Description, IsComplete FROM Tasks WHERE Id = @Id;";

        using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@Id", id);

        using var reader = command.ExecuteReader();

        if (reader.Read())
        {
            return MapReaderToTask(reader);
        }
        
        return null;
    }

    private TaskItem MapReaderToTask(SqlDataReader reader)
    {
        string dbTaskType = reader.GetString(1); 
        
        TaskItem task;

        if (dbTaskType == "Work")
        {
            task = new WorkTask();
        }
        else 
        {
            task = new FamilyTask();
        }

        task.Id = reader.GetInt32(0);
        task.Title = reader.GetString(2);
        task.Description = reader.GetString(3);
        task.IsComplete = reader.GetBoolean(4);

        return task;
    }
}