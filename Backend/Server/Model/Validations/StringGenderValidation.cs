using System.ComponentModel.DataAnnotations;

namespace Server.Model.Validations
{
    public class StringGenderValidation : ValidationAttribute
    {
        private readonly string[] genderTypes = new string[] { "male", "female", "other" };

        public override string FormatErrorMessage(string name)
        {
            return "Invalid gender value";
        }

        protected override ValidationResult IsValid(object objValue,
                                                       ValidationContext validationContext)
        {
            var genderVal = objValue as string;
            if (genderVal == null) 
                return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));

            if (genderVal != null)
            {
                genderVal = genderVal.Trim();
                genderVal = genderVal.ToLower();

                if (genderTypes.Contains(genderVal) == false)
                    return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
            }

            return ValidationResult.Success;
        }
    }
}
