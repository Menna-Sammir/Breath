using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub
{
    public async Task SendComment(AddComment.Command command)
    {
        var comment = await mediator.Send(command);

        await Clients
            .Group(command.ActivityId.ToString())
            .SendAsync("ReceiveComment", comment.Value);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var activityIdString = httpContext?.Request.Query["activityId"].ToString();

        if (string.IsNullOrEmpty(activityIdString))
            throw new HubException("No activity with this id");

        if (!Guid.TryParse(activityIdString, out var activityId))
            throw new HubException("Invalid activity id");

        await Groups.AddToGroupAsync(Context.ConnectionId, activityIdString);

        var result = await mediator.Send(new GetCommentsList.Query { ActivityId = activityId });

        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
}
