using Chat.Core.DTOs;
using Chat.Core.Entities;
using Chat.Core.Repository.Interfaces;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Numerics;

namespace Chat.Core.Repository
{
    public class ConversationUserRepository : IConversationUserRepository
    {
        private readonly DapperContext _context;
        public ConversationUserRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<int> InsertConversationUser(ConversationUser conversationUser)
        {
            using (var connection = _context.CreateConnection())
            {
                var ConversationUserId = await connection.InsertAsync<ConversationUser>(conversationUser);
                return ConversationUserId;
            }
        }
        public async Task<List<UserMessagesDTO>> GetUserMessages(int userId)
        {
            var query = "SELECT CU.ConversationId, M.MessageText, M.ConversationUserId, U.UserId, U.UserName, C.ConversationName FROM Conversations C INNER JOIN ConversationUsers CU ON C.ConversationId = CU.ConversationId INNER JOIN Messages M ON CU.ConversationUserId = M.ConversationUserId INNER JOIN Users U ON U.UserId = CU.UserId WHERE EXISTS (SELECT 1 FROM ConversationUsers WHERE ConversationId = CU.ConversationId AND UserId = @userId)";
            using (var connection = _context.CreateConnection())
            {
                var userMessages = await connection.QueryAsync<UserMessagesDTO>(query, new { userId });
                return userMessages.ToList();
            }
        }
        public async Task<List<ConversationUser>> GetConversationUsersByConversationId(int conversationId)
        {
            var query = "SELECT UserId FROM ConversationUsers WHERE ConversationId = @conversationId";
            using (var connection = _context.CreateConnection())
            {
                var conversationUsers = await connection.QueryAsync<ConversationUser>(query, new { conversationId });
                return conversationUsers.ToList();
            }
        }

    }
}
