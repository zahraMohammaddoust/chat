using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace Chat.Core.DTOs
{
    public class ContactResponseDTO
    {
            public string Name { get; set; }
            public string Phone { get; set; }
            public int ContactUserId { get; set; }
    }
}
