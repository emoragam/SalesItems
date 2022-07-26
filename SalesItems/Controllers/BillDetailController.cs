using Microsoft.AspNetCore.Mvc;
using SalesItems.Context;
using SalesItems.Dto;
using SalesItems.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SalesItems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillDetailController : ControllerBase
    {

        private readonly AppDbContext context;

        public BillDetailController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<BillDetailController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<BillDetailController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BillDetailController>
        [HttpPost]
        public async Task<ActionResult<BillDetail>> Post([FromBody] BillDetailDto value)
        {
            var billHeader = await context.BillHeaders.FindAsync(value.BillHeaderId);
            var article = await context.Articles.FindAsync(value.ArticleId);
            if (billHeader == null || article == null)
                return NotFound();

            var newBillDetail = new BillDetail
            {
                Quantity = value.Quantity,
                BillHeader = billHeader,
                Article = article
            };

            context.BillDetails.Add(newBillDetail);
            context.SaveChanges();

            return newBillDetail;
        }

        // PUT api/<BillDetailController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BillDetailController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
