using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using Application.Reviews.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUserId = null;
            CreateMap<Activity, Activity>();
            CreateMap<CreateActivityDto, Activity>();
            CreateMap<EditActivityDto, Activity>();
            CreateMap<Review, ReviewsDto>()
                .ForMember(d => d.AuthorName, o => o.MapFrom(s => s.User.DisplayName))
                .ForMember(d => d.AuthorImage, o => o.MapFrom(s => s.User.ImageUrl))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.User.ImageUrl));
            CreateMap<Activity, ActivityDto>()
                .ForMember(
                    d => d.HostDisplayName,
                    o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.User.DisplayName)
                )
                .ForMember(
                    d => d.HostId,
                    o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.User.Id)
                );
            CreateMap<ActivityAttendee, UserProfile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
                .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
                .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));

            CreateMap<User, UserProfile>()
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(
                    d => d.Following,
                    o => o.MapFrom(s => s.Followers.Any(f => f.Observer.Id == currentUserId))
                );
            CreateMap<Activity, UserActivityDto>();
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.User.ImageUrl))
                .ForMember(d => d.CreatedAt, o => o.MapFrom(s => s.CreatedAt));
        }
    }
}
