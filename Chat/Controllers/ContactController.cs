using Chat.Core.Entities;
using Chat.Core.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Chat.Library;
using System.Numerics;
namespace Chat.Controllers
{
    [Authorize]
    [Route("api/")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactRepository _ContactRepo;
        public ContactController(IContactRepository ContactRepo)
        {
            _ContactRepo = ContactRepo;

        }
        [HttpPost("[controller]/")]
        public async Task<ActionResult> Post([FromBody] List<Contact> contacts) { 
            bool Execution = true;
            string WarningMessage = "";
            var res = UserTools.GetCurrentUserId(HttpContext.User);
            if (res.userId == null)
                return BadRequest(res.warningMessage);
            if (Execution)
            {
                try
                {      
                    foreach(var dto in contacts)
                    {
                        Contact contact = new Contact()
                        {
                            ContactId= dto.ContactId,
                            Name= dto.Name,
                            Phone= dto.Phone,
                            UserId = (int)res.userId
                        };
                        var ContactId = await _ContactRepo.InsertContact(contact);
                    }
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            if (Execution)
            {
                return Ok();
            }
            else
            {
                return BadRequest(WarningMessage);
            }
        }

        [AllowAnonymous]
        [HttpGet("[controller]/GetContactsByUserId")]
        public async Task<ActionResult> GetContactsByUserId()
        {
            bool Execution = true;
            string WarningMessage = "";
            var res = UserTools.GetCurrentUserId(HttpContext.User);
            if (res.userId == null)
                return BadRequest(res.warningMessage);
            if (Execution)
            {
                try
                {
                    var contact = await _ContactRepo.GetContactsByUserId((int)res.userId);
                    return Ok(contact);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            if (Execution)
            {
                return Ok();
            }
            else
            {
                return BadRequest(WarningMessage);
            }
        }
    }
}
