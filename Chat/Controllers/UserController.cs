using Chat.Core.Entities;
using Chat.Core.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Controllers
{

    [Authorize]
    [Route("api/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _UserRepo;
        public UserController(IUserRepository UserRepo)
        {
            _UserRepo = UserRepo;

        }
        [AllowAnonymous] 
        [HttpPost("[controller]/InsertUser")]
        public async Task<ActionResult> Post([FromBody] User dto)
        {
            bool Execution = true;
            string WarningMessage = "";
            if (Execution)
            {
                try
                {
                    var user = _UserRepo.GetUserByPhone(dto.Phone);
                    if (user == null)
                    {
                        Execution = false;
                        WarningMessage = "This user has already registered";
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            if (Execution)
            {
                try
                {
                    var UserId = await _UserRepo.InsertUser(dto);
                    return Ok(UserId);
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
