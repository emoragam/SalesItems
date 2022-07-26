using System;
using System.Collections.Generic;

namespace SalesItems.Models
{
    public partial class Article
    {
        public Article()
        {
            BillDetails = new HashSet<BillDetail>();
        }

        public int Id { get; set; }
        public string Code { get; set; } = null!;
        public string Name { get; set; } = null!;
        public int Price { get; set; }
        public bool? Iva { get; set; }

        public virtual ICollection<BillDetail> BillDetails { get; set; }
    }
}
