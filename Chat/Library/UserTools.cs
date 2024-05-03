using System.Security.Claims;

namespace Chat.Library
{
    public class UserTools
    {
        public static (int? userId, string? warningMessage) GetCurrentUserId(ClaimsPrincipal AspUser)
        {
            bool execution = true;
            string warningMessage = "";
            int? UserID = null;

            if (execution)
            {
                UserID = (int)Convert.ChangeType(AspUser.FindFirst(ClaimTypes.NameIdentifier)?.Value, typeof(int));
                if (UserID == null || UserID == 0)
                {
                    execution = false;
                    warningMessage = "UnAuth";
                }
            }
            if (execution)
                return (UserID, null);
            else
                return (null, warningMessage);
        }
    }
}
