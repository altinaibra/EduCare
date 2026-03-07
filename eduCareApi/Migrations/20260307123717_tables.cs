using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eduCareApi.Migrations
{
    /// <inheritdoc />
    public partial class tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Telephone",
                table: "Users",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "Adress",
                table: "Users",
                newName: "Address");

            migrationBuilder.CreateTable(
                name: "Childrens",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentID = table.Column<int>(type: "int", nullable: true),
                    AgeID = table.Column<int>(type: "int", nullable: true),
                    ClassID = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Childrens", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Educators",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: true),
                    SpecializimetID = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    K1 = table.Column<int>(type: "int", nullable: false),
                    K2 = table.Column<int>(type: "int", nullable: false),
                    K3 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Educators", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Childrens");

            migrationBuilder.DropTable(
                name: "Educators");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Users",
                newName: "Telephone");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Users",
                newName: "Adress");
        }
    }
}
