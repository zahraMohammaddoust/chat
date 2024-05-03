using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace Chat.Core.Entities
{
    public class Message
    {
        [Dapper.Contrib.Extensions.Key]
        public int MessageId { get; set; }
        [BindNever]
        [Required]
        public DateTime RegDateTime { get; set; }
        [Required(ErrorMessage = "ConversationUserId Is Required")]
        public int ConversationUserId { get; set; }
        public string? MessageText { get; set; }
        public int? FileId { get; set; }
    }
}
