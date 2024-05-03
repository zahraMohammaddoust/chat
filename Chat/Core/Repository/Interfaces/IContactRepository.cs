using Chat.Core.DTOs;
using Chat.Core.Entities;
using System.Diagnostics.Contracts;

namespace Chat.Core.Repository.Interfaces
{
    public interface IContactRepository
    {
        public Task<int> InsertContact(Contact contact);
        public Task<List<ContactResponseDTO>> GetContactsByUserId(int userId);
    }
}
