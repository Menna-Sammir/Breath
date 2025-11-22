using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Activity_Photos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ActivityId",
                table: "Photos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ActivityId",
                table: "Photos",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Activities_ActivityId",
                table: "Photos",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Activities_ActivityId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_ActivityId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "Photos");
        }
    }
}
