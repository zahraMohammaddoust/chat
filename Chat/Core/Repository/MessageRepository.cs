using Chat.Core.Entities;
using Chat.Core.Repository.Interfaces;
using Dapper.Contrib.Extensions;

namespace Chat.Core.Repository
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DapperContext _context;
        public MessageRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<int> InsertMessage(Message message)
        {
            using (var connection = _context.CreateConnection())
            {
                var ConversationId = await connection.InsertAsync<Message>(message);
                return ConversationId;
            }
        }
    }
}
