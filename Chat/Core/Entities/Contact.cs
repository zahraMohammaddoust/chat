using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Chat.Core.Entities
{
    public class Contact
    {
        [Dapper.Contrib.Extensions.Key]
        [BindNever]
        [JsonIgnore]
        public int ContactId { get; set; }
        [Required(ErrorMessage = "Name Is Required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Phone Is Required")]
        public string Phone { get; set; }
        [BindNever]
        [JsonIgnore]
        public int UserId { get; set; }
    }
}
