using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;

namespace Application.Core
{
    public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
        : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        public async Task<TResponse> Handle(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken
        )
        {
            if (validator != null)
            {
                await validator.ValidateAndThrowAsync(request, cancellationToken);
            }
            return await next();
        }
    }
}
