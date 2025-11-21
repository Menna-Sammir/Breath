using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Reviews.DTOs
{
    public class EditReviewDto : BaseReviewDto
    {
        public Guid Id { get; set; } = Guid.Empty;

        public static implicit operator EditReviewDto(Review v)
        {
            throw new NotImplementedException();
        }
    }
}
