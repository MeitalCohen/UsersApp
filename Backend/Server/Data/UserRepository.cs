using Server.Data;
using Server.Model;

namespace Server.DAL
{
    public class UserRepository : IUserRepository
    {
        private readonly ILogger<UserRepository> _logger;
        private readonly UsersContext _usersContext;
        public UserRepository(UsersContext usersContext, ILogger<UserRepository> logger)
        {
            _usersContext = usersContext;
            _logger = logger;
        }

        public Model.User Get(int id)
        {
            if (_usersContext.Users == null || _usersContext.Users.Any() == false)
                return null;

            var currentUserDB = _usersContext.Users.SingleOrDefault(u => u.Id == id);
            return new Model.User
            {
                Id = currentUserDB.Id,
                Birthday = currentUserDB.Birthday,
                Email = currentUserDB.Email,
                Name = currentUserDB.Name,
                Gender = currentUserDB.Gender,
                Phone = currentUserDB.Phone
            };

        }

        public List<Model.User> GetAllUsers()
        {
            if (_usersContext.Users == null || _usersContext.Users.Any() == false)
                return new List<Model.User>();

            return _usersContext.Users.Select(o => new Model.User
            {
                Id = o.Id,
                Name = o.Name,
                Birthday = o.Birthday,
                Email = o.Email,
                Gender = o.Gender,
                Phone = o.Phone
            }).ToList();
        }

        public ResultModel UpdateUser(Model.User user)
        {
            var currentUser = _usersContext.Users.FirstOrDefault(o => o.Id == user.Id);
            if (currentUser == null)
                return ResultModel.ERROR("Entity not found");

            currentUser.Email = user.Email;
            currentUser.Gender = user.Gender;
            currentUser.Birthday = user.Birthday;
            currentUser.Phone = user.Phone;
            currentUser.Name = user.Name;

            return SaveChanges();
        }

        public ResultModel DeleteUser(int id)
        {
            var currentUser = _usersContext.Users.FirstOrDefault(o => o.Id == id);
            if (currentUser != null)
            {
                _usersContext.Remove(currentUser);
                return SaveChanges();
            }

            return ResultModel.ERROR("Entity not found");
        }

        public ResultModel CreateUser(Model.User user)
        {
            var existingUser = _usersContext.Users.FirstOrDefault(o => o.Id == user.Id);
            if (existingUser != null)
                return ResultModel.ERROR("Entity already exists");

            var entity = new Data.User
            {
                Id = user.Id,
                Birthday = user.Birthday,
                Email = user.Email,
                Gender = user.Gender,
                Name = user.Name,
                Phone = user.Phone,
            };

            _usersContext.Users.Add(entity);
            return SaveChanges();
        }

        private ResultModel SaveChanges()
        {
            try
            {
                _usersContext.SaveChanges();
                return ResultModel.OK();
            }
            catch (Exception e)
            {
                _logger.LogError(LogEventIds.DBFailedToSave,
                                 exception: e,
                                 message: e.Message);
                return ResultModel.ERROR("Failed to save");
            }
        }
    }
}
