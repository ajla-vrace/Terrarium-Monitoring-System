using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proba_iot.Migrations
{
    /// <inheritdoc />
    public partial class pocetna : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SenzorPodaci",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Temperatura = table.Column<float>(type: "real", nullable: false),
                    Vlaznost = table.Column<float>(type: "real", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SenzorPodaci", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SenzorPodaci");
        }
    }
}
