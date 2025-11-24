using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ChangePasswordDto
    {
        [Required]
        public required string CurrentPassword { get; set; } = string.Empty;

        [Required]
        public required string NewPassword { get; set; } = string.Empty;
    }
}
