using Microsoft.AspNetCore.Mvc.Filters;

namespace Server.Model.ActionFilters
{
    public class TrimInputActionFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            foreach (var argument in context.ActionArguments.Values)
            {
                if (argument is User user)
                {
                    user.Name = user.Name?.Trim();
                    user.Email = user.Email?.Trim();
                    user.Phone = user.Phone?.Trim();
                    user.Gender = user.Gender?.Trim();
                }
            }
        }
    }
}
