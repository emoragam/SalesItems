using Microsoft.AspNetCore.Mvc;
using SalesItems.Context;
using SalesItems.Models;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SalesItems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly AppDbContext context;

        public ArticlesController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<ArticlesController>
        [HttpGet]
        public IEnumerable<Article> Get()
        {
            return context.Articles.ToList();
        }

        // GET api/<ArticlesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("byCode")]
        public IQueryable<Article> Get(string code)
        {
            return context.Articles.Where(x => x.Code == code);
        }

        // POST api/<ArticlesController>
        [HttpPost]
        public void Post([FromBody] Article article)
        {
            if (article.Id == null)
            {
                context.Articles.Add(article);
            }else
            {
                context.Articles.Update(article);
            }
            context.SaveChanges();
        }

        // PUT api/<ArticlesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ArticlesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var article = context.Articles.Find(id);
            context.Articles.Remove(article);
            context.SaveChanges();
        }
    }
}
