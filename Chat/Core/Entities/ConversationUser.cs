using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace Chat.Core.Entities
{
    public enum RoleTypes
    {
        admin = 1,
        user = 2
    }
    public class ConversationUser
    {
        [Dapper.Contrib.Extensions.Key]
        public int ConversationUserId { get; set; }
        [Required(ErrorMessage = "ConversationId Is Required")]
        public int ConversationId { get; set; }
        [Required(ErrorMessage = "RoleTypes Is Required")]
        public RoleTypes? Role { get; set; }
        [Required(ErrorMessage = "UserId Is Required")]
        public int UserId { get; set; }
     
    }
}
