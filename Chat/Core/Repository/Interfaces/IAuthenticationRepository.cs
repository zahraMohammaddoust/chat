using Chat.Core.Entities;
namespace Chat.Core.Repository.Interfaces
{
    public interface IAuthenticationRepository
    {
        public Task<string?> Authentication(User user);
    }
}
