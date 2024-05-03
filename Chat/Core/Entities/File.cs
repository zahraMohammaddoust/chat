using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace Chat.Core.Entities
{
    public class File
    {
        [Dapper.Contrib.Extensions.Key]
        public int FileId { get; set; }
        [Required(ErrorMessage = "MessageId Is Required")]
        public int MessageId { get; set; }
        [Required(ErrorMessage = "FilePath Is Required")]
        public string FilePath { get; set; }
    }
}
