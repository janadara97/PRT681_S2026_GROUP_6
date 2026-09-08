using Data;
using Microsoft.Data.SqlClient;

class DatabaseInitilizer
{

  private readonly string _masterConnectionString;
    private readonly string _databaseConnectionString;
    private readonly DatabaseConnectionFactory _connectionFactory;

    public DatabaseInitilizer(
        string masterConnectionString,
        string databaseConnectionString,
        DatabaseConnectionFactory connectionFactory)
    {
        _masterConnectionString = masterConnectionString;
        _databaseConnectionString = databaseConnectionString;
        _connectionFactory = connectionFactory;
    }
  public void Initializedatabase()
  {

    using var connection = new SqlConnection(_masterConnectionString);
    connection.Open();

    string sql = 
    """
    IF DB_ID('TaskManagerDB') IS NULL
    BEGIN
      CREATE DATABASE TaskManagerDB;
    END
    """;
    var command = new SqlCommand(sql,connection);
    command.ExecuteNonQuery();
  }

  public void CreateTable()
  {
    var connection = _connectionFactory.CreateConnection();
    connection.Open();

    String sql =
    """
    IF OBJECT_ID('Tasks', 'U') IS NULL
    BEGIN
      CREATE TABLE Tasks
      (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Title VARCHAR(200) NOT NULL,
        Description VARCHAR(750) NOT NULL,
        IsComplete BIT NOT NULL DEFAULT 0,
        TaskType VARCHAR(200) NOT NULL
      );
    END
    """;

    var command = new SqlCommand(sql,connection);
    command.ExecuteNonQuery();
  }
}