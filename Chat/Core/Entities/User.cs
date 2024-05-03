using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Chat.Core.Entities
{
    [System.ComponentModel.DataAnnotations.Schema.Table("Users")]
    public class User
    {
        [Dapper.Contrib.Extensions.Key]
        [BindNever]
        public int UserId { get; set; }
        [Required(ErrorMessage = "UserName Is Required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password Is Required")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Phone Is Required")]
        public string Phone {get; set;}
    }
}
