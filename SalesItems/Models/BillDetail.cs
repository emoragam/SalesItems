using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SalesItems.Models
{
    public partial class BillDetail
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int BillHeaderId { get; set; }
        public int ArticleId { get; set; }

        [JsonIgnore]
        public virtual Article Article { get; set; } = null!;
        [JsonIgnore]
        public virtual BillHeader BillHeader { get; set; } = null!;
    }
}
