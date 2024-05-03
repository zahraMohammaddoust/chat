using Chat.Core.DTOs;
using Chat.Core.Entities;
using Chat.Core.Repository.Interfaces;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Diagnostics.Contracts;

namespace Chat.Core.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly DapperContext _context;
        public ContactRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<int> InsertContact(Contact contact)
        {
            using (var connection = _context.CreateConnection())
            {
                var ContactId = await connection.InsertAsync<Contact>(contact);
                return ContactId;
            }
        }
        public async Task<List<ContactResponseDTO>> GetContactsByUserId(int userId)
        {
            var query = "SELECT u.UserId AS ContactUserId, c.Name, c.Phone FROM Users u INNER JOIN Contacts c ON u.Phone = c.Phone WHERE c.UserId = @userId";
            using (var connection = _context.CreateConnection())
            {
                var contacts = await connection.QueryAsync<ContactResponseDTO>(query, new { userId });
                return contacts.ToList();
            }
        }

    }
}
