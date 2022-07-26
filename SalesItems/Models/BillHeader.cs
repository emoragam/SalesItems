using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SalesItems.Models
{
    public partial class BillHeader
    {
        public BillHeader()
        {
            BillDetails = new HashSet<BillDetail>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string CodeBill { get; set; } = null!;
        public int Total { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; } = null!;
        public virtual ICollection<BillDetail> BillDetails { get; set; }
    }
}
