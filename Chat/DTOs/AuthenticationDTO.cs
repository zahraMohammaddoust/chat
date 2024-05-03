using System.ComponentModel.DataAnnotations;

namespace Chat.DTOs
{
    public class AuthenticationDTO
    {
        [Required(ErrorMessage = "UserName Is Required")]
        public string? UserName { get; set; }
        [Required(ErrorMessage = "Password Is Required")]
        public string? Password { get; set; }
    }
}
