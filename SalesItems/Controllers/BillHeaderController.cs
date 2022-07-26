using Microsoft.AspNetCore.Mvc;
using SalesItems.Context;
using SalesItems.Dto;
using SalesItems.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SalesItems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillHeaderController : ControllerBase
    {

        private readonly AppDbContext context;

        public BillHeaderController(AppDbContext context)
        {
            this.context = context;
        }



        // GET: api/<BillHeaderController>
        [HttpGet]
        public IEnumerable<BillHeader> Get()
        {
            return context.BillHeaders.ToList();
        }

        // GET api/<BillHeaderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BillHeaderController>
        [HttpPost]
        public async Task<ActionResult<BillHeader>> Post([FromBody] BillHeaderDto value)
        {
            var user = await context.Users.FindAsync(value.UserId);
            if (user == null)
                return NotFound();

            var newBillHeader = new BillHeader
            {
                Date = DateTime.Now,
                CodeBill = value.CodeBill,
                Total = value.Total,
                User = user
            };
            context.BillHeaders.Add(newBillHeader);
            context.SaveChanges();

            return newBillHeader;
        }

        // PUT api/<BillHeaderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BillHeaderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
