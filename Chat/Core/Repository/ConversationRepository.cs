using Chat.Core.Entities;
using Chat.Core.Repository.Interfaces;
using Dapper.Contrib.Extensions;
using Microsoft.VisualBasic;

namespace Chat.Core.Repository
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly DapperContext _context;
        public ConversationRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<int> InsertConversation(Conversation conversation)
        {
            using (var connection = _context.CreateConnection())
            {
                var ConversationId = await connection.InsertAsync(conversation);
                return ConversationId;
            }
        }
        public async Task<Conversation> GetConversationById(int? id)
        { 
            using (var connection = _context.CreateConnection())
           {
                var Conversation = await connection.GetAsync<Conversation>(id);
                return Conversation;
            }
        }

    }
}
