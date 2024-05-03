using Chat.Core.Entities;

namespace Chat.Core.DTOs
{
    public class UserMessagesDTO
    {
        public int ConversationId { get; set; }
        public string MessageText { get; set; }
        public int ConversationUserId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string ConversationName { get; set; }
    }
}
