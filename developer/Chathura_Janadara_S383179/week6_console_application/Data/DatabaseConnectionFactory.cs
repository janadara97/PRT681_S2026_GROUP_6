namespace Data;
using Microsoft.Data.SqlClient;

  public class DatabaseConnectionFactory
  {
    private readonly string _connectionString;

    public DatabaseConnectionFactory(string connectionString)
    {
      _connectionString = connectionString;
    }

    public SqlConnection CreateConnection()
    {
      return new SqlConnection(_connectionString);
    }
  }
