using Chat.Core.Repository.Interfaces;
using Chat.Library;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Controllers
{
    [Authorize]
    [Route("api/")]
    [ApiController]
    public class ConversationUserController : ControllerBase
    {
        private readonly IConversationUserRepository _ConversationUserRepo;
        public ConversationUserController(IConversationUserRepository ConversationUserRepo)
        {
            _ConversationUserRepo = ConversationUserRepo;

        }
        [AllowAnonymous]
        [HttpGet("[controller]/GetUserMessages")]
        public async Task<ActionResult> Get()
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
                    var contact = await _ConversationUserRepo.GetUserMessages((int)res.userId);
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
