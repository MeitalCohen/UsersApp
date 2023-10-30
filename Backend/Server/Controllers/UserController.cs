using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Server.Model;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository, ILogger<UserController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            _logger.LogInformation("Get All Users");
            var users = _userRepository.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            _logger.LogInformation("Get User: {id}", id);

            var user = _userRepository.Get(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _logger.LogInformation("Create User id: {id} with the name: {name}", user.Id, user.Name);
            if (!ModelState.IsValid)
            {
                _logger.LogError("Failed to Create User. Errors:{errors}", GetErrorMessages(ModelState));
                return BadRequest(ModelState);
            }

            var result = _userRepository.CreateUser(user);
            if (result.IsOk)
                return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpPut("{id}")]
        public IActionResult Put(User updatedUser)
        {
            _logger.LogInformation("Update User: {id}", updatedUser.Id);

            if (!ModelState.IsValid)
            {
                _logger.LogError("Failed to Update User. Errors:{errors}", GetErrorMessages(ModelState));
                return BadRequest(ModelState);
            }

            var result = _userRepository.UpdateUser(updatedUser);
            if (result.IsOk)
                return NoContent();
            else
                return BadRequest(result.ErrorMessage);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("Delete User: {id}", id);

            var result = _userRepository.DeleteUser(id);
            if (result.IsOk)
                return NoContent();
            else
                return BadRequest(result.ErrorMessage);
        }

        private static string GetErrorMessages(ModelStateDictionary modelState) =>
            string.Join("; ", modelState.Values
                .SelectMany(x => x.Errors)
                .Select(x => x.ErrorMessage));
    }
}