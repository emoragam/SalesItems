using System;
using System.Collections.Generic;

namespace SalesItems.Dto
{
    public partial class BillHeaderDto
    {

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string CodeBill { get; set; } = null!;
        public int Total { get; set; }
        public int UserId { get; set; }
    }
}
