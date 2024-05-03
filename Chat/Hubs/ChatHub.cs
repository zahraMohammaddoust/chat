
using Chat.Core;
using Chat.Core.Entities;
using Chat.Core.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Authentication;
using System.Security.Claims;

namespace Chat.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly DapperContext _context;
        private readonly IConversationRepository _conversationRepo;
        private readonly IMessageRepository _messageRepo;
        private readonly IConversationUserRepository _conversationUserRepo;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private static readonly Dictionary<int, string> userConnectionIds = new Dictionary<int, string>();


        public ChatHub(DapperContext context, IConversationRepository conversationRepo, IMessageRepository messageRepo, IConversationUserRepository conversationUserRepo, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _conversationRepo = conversationRepo;
            _messageRepo = messageRepo;
            _conversationUserRepo = conversationUserRepo;
            _httpContextAccessor = httpContextAccessor;
        }

        public override async Task OnConnectedAsync()
        {
            var userIdString = Context.UserIdentifier;
            if (!int.TryParse(userIdString, out int userId))
                throw new ArgumentException("Invalid userId format.");
            userConnectionIds[userId] = Context.ConnectionId;

            await base.OnConnectedAsync();
        }


        public async Task SendMessage(List<string> users, string message, int? conversationId)
        {
            var userIdString = Context.UserIdentifier;
            if (string.IsNullOrEmpty(userIdString))
                throw new AuthenticationException("User is not authenticated.");
            if (!int.TryParse(userIdString, out int userId))
                throw new ArgumentException("Invalid userId format.");
            Conversation conversation;
            if (conversationId == null)
            {
                var newConversation = new Conversation()
                {
                    ConversationId = 0,
                    RegDateTime = DateTime.Now,
                    RegUserId = userId,
                    ConversationName = userIdString,
                };
                conversationId = await _conversationRepo.InsertConversation(newConversation);
                if (conversationId == null)
                    throw new Exception("Failed to create conversation.");
                int convId = conversationId.Value;
                List<int> usersId = users.ConvertAll(int.Parse);
                foreach (var user in usersId)
                {
                    var conversationUser = new ConversationUser()
                    {
                        ConversationId = convId,
                        Role = RoleTypes.user,
                        UserId = user
                    };
                    var insertedUser = await _conversationUserRepo.InsertConversationUser(conversationUser);
                    if (insertedUser == null)
                        throw new Exception("Failed to insert conversation user.");
                }
            }
            else
            {
                conversation = await _conversationRepo.GetConversationById(conversationId);
                if (conversation == null)
                    throw new ArgumentException("Conversation not found.");
            }
            var newMessage = new Message()
            {
                RegDateTime = DateTime.Now,
                ConversationUserId = 1,
                MessageText = message,
                FileId = null
            };
            var insertedMessage = await _messageRepo.InsertMessage(newMessage);
            if (insertedMessage == null) throw new Exception("Failed to insert message.");
            var conversationUsers = await _conversationUserRepo.GetConversationUsersByConversationId(conversationId.Value);
            if (conversationUsers == null) throw new Exception("Failed to get conversation users.");
            foreach (var user in conversationUsers)
            {
                //userConnectionIds[user.UserId] = Context.ConnectionId;

                if (user.UserId != userId)
                {
                    if (userConnectionIds.TryGetValue(user.UserId, out string connectionId))
                    {
                        await Clients.Client(connectionId).SendAsync("ReceiveMessage", userId, message, userIdString);
                    }
                }
            }
        }



    }

}

