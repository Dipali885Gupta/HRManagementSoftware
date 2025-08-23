using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRManagementSoftware.Migrations
{
    /// <inheritdoc />
    public partial class Added_Employee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppEmployees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EmployeeNumber = table.Column<string>(type: "nvarchar(max)", maxLength: 1000000, nullable: false),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", maxLength: 1000000, nullable: false),
                    DateOfJoining = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaidLeaveBalance = table.Column<decimal>(type: "decimal(18,2)", maxLength: 100000, nullable: false),
                    SickLeaveBalance = table.Column<decimal>(type: "decimal(18,2)", maxLength: 100000, nullable: false),
                    UnpaidLeaveBalance = table.Column<decimal>(type: "decimal(18,2)", maxLength: 100000, nullable: false),
                    BaseSalary = table.Column<decimal>(type: "decimal(18,2)", maxLength: 100000, nullable: false),
                    IdentityUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppEmployees_AbpUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppEmployees_IdentityUserId",
                table: "AppEmployees",
                column: "IdentityUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppEmployees");
        }
    }
}
