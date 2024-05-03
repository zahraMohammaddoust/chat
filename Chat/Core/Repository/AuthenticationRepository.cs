using Chat.Core.Repository.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Chat.Core.Entities;

namespace Chat.Core.Repository
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly string key;
        /// <summary>
        /// sets encrypt key
        /// </summary>
        /// <param name="key">string encrypt key</param>
        public AuthenticationRepository(string key)
        {
            this.key = key;
        }
        public async Task<string?> Authentication(User user)
        {

            //var dbContext = new DapperContext() { }
            if (user == null)
                return null;
            // 1. Create Security Token Handler
            var tokenHandler = new JwtSecurityTokenHandler();

            // 2. Create Private Key to Encrypted
            var tokenKey = Encoding.ASCII.GetBytes(key);


            //3. Create JETdescriptor
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                //new Claim(ClaimTypes.Role, "Admin"),
            };

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(10),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            //4. Create Token

            var token = tokenHandler.CreateToken(tokenDescriptor);

            // 5. Return Token from method
            return tokenHandler.WriteToken(token);
        }


    }
}
