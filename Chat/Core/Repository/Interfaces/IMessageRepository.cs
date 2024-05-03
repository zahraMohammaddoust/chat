using Chat.Core.Entities;

namespace Chat.Core.Repository.Interfaces
{
    public interface IMessageRepository
    {
        public Task<int> InsertMessage(Message message);
    }
}
