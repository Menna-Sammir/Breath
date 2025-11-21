using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Reviews.DTOs
{
    public class BaseReviewDto
    {
        public required Guid ActivityId { get; set; }
        public required string Body { get; set; } = string.Empty;
        public required int Rating { get; set; } = 0;
    }
}
