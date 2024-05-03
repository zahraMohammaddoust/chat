using Chat.Core.Entities;

namespace Chat.Core.Repository.Interfaces
{
    public interface IConversationRepository
    {
        public Task<int> InsertConversation(Conversation conversation);
        public Task<Conversation> GetConversationById(int? id);

    }
}
