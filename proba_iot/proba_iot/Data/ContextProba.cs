using Microsoft.EntityFrameworkCore;

namespace proba_iot.Data
{
    public class ContextProba:DbContext
    {
       
            public ContextProba(DbContextOptions<ContextProba> options) : base(options)
            {
            }

            public DbSet<SenzorPodaci> SenzorPodaci { get; set; }

        
    }
}
