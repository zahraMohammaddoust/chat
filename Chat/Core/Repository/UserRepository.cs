using Chat.Core.Entities;
using Chat.Core.Repository.Interfaces;
using Dapper;
using Dapper.Contrib.Extensions;

namespace Chat.Core.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _context;
        public UserRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<User> GetUserByPhone(string phone)
        {
            var query = "SELECT [UserId],[UserName],[Password],[Phone] FROM Users where Phone = @phone";
            using (var connection = _context.CreateConnection())
            {
                var user = await connection.QueryAsync<User>(query, new { phone });
                return (User)user;
            }
        }
        public async Task<int> InsertUser(User user)
        {
            using (var connection = _context.CreateConnection())
            {
                var UserId = await connection.InsertAsync<User>(user);
                return UserId;
            }
        }
    }
}
