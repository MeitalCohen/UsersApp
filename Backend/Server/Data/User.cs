using System;
using System.Collections.Generic;

namespace Server.Data;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Email { get; set; }

    public DateTime Birthday { get; set; }

    public string? Gender { get; set; }

    public string? Phone { get; set; }
}
