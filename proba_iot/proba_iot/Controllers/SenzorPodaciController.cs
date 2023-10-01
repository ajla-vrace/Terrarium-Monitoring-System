using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using proba_iot.Data;
using System.Net.Mail;
namespace proba_iot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SenzorPodaciController : ControllerBase
    {
        private readonly ContextProba _context;

        public SenzorPodaciController(ContextProba context)
        {
            _context = context;
        }
/*
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SenzorPodaci>>> GetSensorData()
        {
            return await _context.SenzorPodaci.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<SenzorPodaci>> PostSensorData(SenzorPodaci sensorData)
        {
            _context.SenzorPodaci.Add(sensorData);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSensorData), new { id = sensorData.Id }, sensorData);
        }


        public class SenzorPodaciDto
        {
            public float Temperature { get; set; }
            public float Humidity { get; set; }
        }



        [HttpPost("ocitaj1")]
        public IActionResult OcitajIPohraniPodatke1(float temperature, float humidity)
        {
            // Kreiranje novog objekta SenzorPodaci sa podacima
            var noviPodaci = new SenzorPodaci
            {
                Temperatura = temperature,
                Vlaznost = humidity,
                Timestamp = DateTime.Now
            };

            _context.SenzorPodaci.Add(noviPodaci);
            _context.SaveChanges();

            return Ok("Podaci uspešno pohranjeni.");
        }
        [HttpPost("ocitajPodatke")]
        public async Task<IActionResult> OcitajIPohraniPodatke([FromQuery] float temperature, [FromQuery] float vlaznost)
        {
            try
            {
                SenzorPodaci noviPodaci = new SenzorPodaci
                {
                    Temperatura = temperature,
                    Vlaznost = vlaznost,
                    Timestamp = DateTime.Now
                };

                _context.SenzorPodaci.Add(noviPodaci);
                await _context.SaveChangesAsync();

                return Ok("Podaci uspešno sačuvani.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Greška: {ex.Message}");
            }
        }
*/
    }
}
