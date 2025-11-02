using Application.Activities.DTOs;
using FluentValidation;

public class BaseActivityValidator<T,TDto> : AbstractValidator<T>
    where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title)
            .NotEmpty()
            .MaximumLength(100).WithMessage("Title cannot exceed 100 characters.")
            .WithMessage("Title is required.");

        RuleFor(x => selector(x).Description)
            .NotEmpty()
            .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.")
            .WithMessage("Description is required.");

        RuleFor(x => selector(x).Category)
            .NotEmpty()
            .WithMessage("Category is required.");

        RuleFor(x => selector(x).Date)
            .NotEmpty()
            .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future.")
            .WithMessage("Date is required.");

        RuleFor(x => selector(x).City)
            .NotEmpty()
            .WithMessage("City is required.");

        RuleFor(x => selector(x).Venue)
            .NotEmpty()
            .WithMessage("Venue is required.");

        RuleFor(x => selector(x).Latitude)
            .NotNull()
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90.")
            .WithMessage("Latitude is required.");

        RuleFor(x => selector(x).Longitude)
            .NotNull()
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180.")
            .WithMessage("Longitude is required.");
    }
}