using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Activities.DTOs
{
  public class EditActivityDto : BaseActivityDto
  {
    public Guid Id { get; set; } = Guid.Empty;

    public static implicit operator EditActivityDto(Activity v)
    {
      throw new NotImplementedException();
    }
  }
}