using System;
using System.Collections.Generic;

namespace SalesItems.Dto
{
    public partial class BillDetailDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int BillHeaderId { get; set; }
        public int ArticleId { get; set; }
    }
}
