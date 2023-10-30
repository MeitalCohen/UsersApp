using Microsoft.IdentityModel.Tokens;
using Server.Model.Validations;
using System.ComponentModel.DataAnnotations;

namespace Server.Model
{
    public class User
    {
        [Required(ErrorMessage = "Id is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Id cannot be non positive number")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 50 characters")]
        public string Name { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [StringGenderValidation]
        public string Gender { get; set; }

        [Required(ErrorMessage = "Birthday is required")]
        [DateLessThanToday]
        public DateTime Birthday { get; set; }
    }
}
