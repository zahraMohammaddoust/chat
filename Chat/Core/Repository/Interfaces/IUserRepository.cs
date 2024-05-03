using Chat.Core.Entities;
namespace Chat.Core.Repository.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> GetUserByPhone(string phone);
        public Task<int> InsertUser(User user);

    }
}
