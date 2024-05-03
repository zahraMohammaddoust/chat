using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace Chat.Core.Entities
{
    public class Conversation
    {
        [Dapper.Contrib.Extensions.Key]
        public int ConversationId { get; set; }
        [BindNever]
        [Required]
        public DateTime RegDateTime { get; set; }
        [Required(ErrorMessage = "RegUserId Is Required")]
        public int RegUserId { get; set; }
        [Required(ErrorMessage = "ConversationName Is Required")]
        public string ConversationName { get; set; }

    }
}
