namespace Server.Model
{
    public interface IUserRepository
    {
        User Get(int id);

        List<User> GetAllUsers();

        ResultModel UpdateUser(User user);

        ResultModel DeleteUser(int id);

        ResultModel CreateUser(User user);
    }
}
