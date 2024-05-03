using Chat.Core.Repository.Interfaces;
using Chat.Core;
using Microsoft.AspNetCore.Mvc;
using Chat.DTOs;
using Chat.Core.Entities;
using Dapper;

namespace Chat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationRepository _AuthenticationRepo;
        private readonly DapperContext _context;
        public AuthenticationController(IAuthenticationRepository authenticationRepo, DapperContext context)
        {
            _AuthenticationRepo = authenticationRepo;
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AuthenticationDTO dto)

        {
            string? token = "";
            string error = "";
            bool exec = true;
            User user = new User();
            if (exec)
            {
                try
                {
                    if (string.IsNullOrEmpty(dto.UserName) || string.IsNullOrEmpty(dto.Password))
                    {
                        error = "The username or password is incorrect";
                        exec = false;
                    }
                    else
                    {
                        using (var connection = _context.CreateConnection())
                        {
                            connection.Open();
                            try
                            {
                                var users = await connection.QueryAsync<User>("SELECT [UserId] ,[UserName] ,[Password] from Users WHERE UserName = @UserName and Password = @Password", new { dto.UserName, dto.Password });

                                if (users == null || !users.Any())
                                {
                                    error = "The username or password is incorrect";
                                    exec = false;
                                }
                                else
                                {
                                    user = users.First();
                                }
                            }
                            catch (Exception ex)
                            {
                                var a = ex.Message;
                            }

                        }
                    }
                }
                catch (Exception e)
                {

                    error = e.Message;
                    exec = false;
                }
            }

            if (exec)
            {
                token = await _AuthenticationRepo.Authentication(user);


                if (token == null)
                {
                    exec = false;
                    error = "The username or password is incorrect";

                }
            }
            if (exec)
            {
                return Ok(new
                {
                    ticket = token,
                    expireDate = DateTime.Now.AddYears(1),
                });
            }
            else
            {
                return BadRequest(error);
            }
        }

    }
}
