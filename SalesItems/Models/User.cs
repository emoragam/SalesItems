using System;
using System.Collections.Generic;

namespace SalesItems.Models
{
    public partial class User
    {
        public User()
        {
            BillHeaders = new HashSet<BillHeader>();
        }

        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;

        public virtual ICollection<BillHeader> BillHeaders { get; set; }
    }
}
