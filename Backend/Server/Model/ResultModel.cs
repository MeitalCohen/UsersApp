namespace Server.Model
{
    public class ResultModel
    {
        public bool IsOk { get; set; }
        public string ErrorMessage { get; set; }

        private ResultModel()
        {}

        public static ResultModel OK() => new() { IsOk = true };

        public static ResultModel ERROR(string errorMessage) => new() { IsOk = false, ErrorMessage = errorMessage };
    }
}
