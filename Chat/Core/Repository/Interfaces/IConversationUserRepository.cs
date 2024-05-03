using Chat.Core.DTOs;
using Chat.Core.Entities;

namespace Chat.Core.Repository.Interfaces
{
    public interface IConversationUserRepository
    {
        public Task<int> InsertConversationUser(ConversationUser conversationUser);
        public Task<List<UserMessagesDTO>> GetUserMessages(int userId);
        public Task<List<ConversationUser>> GetConversationUsersByConversationId(int conversationId);

    }
}
