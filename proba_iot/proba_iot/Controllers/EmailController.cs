using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using proba_iot.Data;
using proba_iot.Helper;

namespace proba_iot.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly ContextProba _context;

        public EmailController(ContextProba context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult VrijednostVanGranica(float temperatura,float vlaznost)
        {
           
          PosaljiMail.Upozorenje("probaa.probaa1234@gmail.com",temperatura,vlaznost);

          return Ok("Upozorenje - poruka.");
         
        }

    }
}
