using System;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
        var users = new List<User>
        {
            new()
            {
                DisplayName = "Menna",
                UserName = "menna@test.com",
                Email = "menna@test.com",
            },
            new()
            {
                DisplayName = "Bob",
                UserName = "bob@test.com",
                Email = "bob@test.com",
            },
            new()
            {
                DisplayName = "Tom",
                UserName = "tom@test.com",
                Email = "tom@test.com",
            },
            new()
            {
                DisplayName = "Jane",
                UserName = "jane@test.com",
                Email = "jane@test.com",
            },
        };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if (context.Activities.Any())
            return;

        var activities = new List<Activity>
        {
            new()
            {
                Title = "Aswan Healing & Wellness Retreat",
                Date = DateTime.Now.AddDays(40),
                Description =
                    "A restorative retreat in Aswan with traditional Nubian treatments, massages, and wellness diagnostics at MGM Wellness Clinic.",
                Category = "medical",
                City = "Aswan",
                Country = "Egypt",
                Duration = 6,
                Price = 1800m,
                Venue = "MGM Wellness Clinic, Aswan, Egypt",
                Latitude = 24.0889,
                Longitude = 32.8992,
                DeparturePlace = "Aswan International Airport",

                Attendees =
                {
                    new() { UserId = users[1].Id, IsHost = true },
                },
            },
            new()
            {
                Title = "Zulal Serenity Wellness Retreat",
                Date = DateTime.Now.AddDays(50),
                Description =
                    "A scientifically supported wellness and rehab program at Zulal Serenity resort, combining physical therapy, nutrition, and holistic healing.",
                Category = "wellness",
                City = "Umm Al Quwain",
                Country = "United Arab Emirates",
                Duration = 7,
                Price = 4000m,
                Venue = "Zulal Serenity Retreat, Umm Al Quwain, UAE",
                Latitude = 25.5820,
                Longitude = 55.5470,
                DeparturePlace = "Dubai International Airport",
            },
            new()
            {
                Title = "Tigris Valley Holistic Healing Retreat",
                Date = DateTime.Now.AddDays(60),
                Description =
                    "Natural and holistic healing in Tigris Valley combining Greek medicine, homeopathy, and modern therapies.",
                Category = "wellness",
                City = "Tigris Valley",
                Country = "Egypt",
                Duration = 5,
                Price = 1500m,
                Venue = "Tigris Valley Wellness Center, Egypt",
                Latitude = 30.2000,
                Longitude = 31.3000,
                DeparturePlace = "Cairo International Airport",
            },
            new()
            {
                Title = "Fiuggi Thermal & Medi Spa Retreat",
                Date = DateTime.Now.AddDays(70),
                Description =
                    "A healing getaway in Fiuggi, Italy, to benefit from its famous thermal waters and modern medical spa treatments.",
                Category = "medical",
                City = "Fiuggi",
                Country = "Italy",
                Duration = 7,
                Price = 5000m,
                Venue = "Palazzo Fiuggi, Fiuggi, Italy",
                Latitude = 41.7758,
                Longitude = 13.0986,
                DeparturePlace = "Rome Fiumicino Airport",
            },
            new()
            {
                Title = "Bad Wörishofen Hydrotherapy Retreat",
                Date = DateTime.Now.AddDays(80),
                Description =
                    "A therapeutic spa retreat in the famous German spa town of Bad Wörishofen, known for hydrotherapy and Kneipp therapies.",
                Category = "wellness",
                City = "Bad Wörishofen",
                Country = "Germany",
                Duration = 5,
                Price = 3000m,
                Venue = "Therme Bad Wörishofen, Germany",
                Latitude = 48.0000,
                Longitude = 10.5000,
                DeparturePlace = "Munich Airport",
            },
            new()
            {
                Title = "Lanserhof Tegernsee Medi-Detox Retreat",
                Date = DateTime.Now.AddDays(90),
                Description =
                    "A modern medi-detox retreat in the Bavarian Alps combining fasting, genetic testing, and high-tech wellness therapies.",
                Category = "medical",
                City = "Tegernsee",
                Country = "Germany",
                Duration = 7,
                Price = 7000m,
                Venue = "Lanserhof Tegernsee, Germany",
                Latitude = 47.7455,
                Longitude = 11.7314,
                DeparturePlace = "Munich Airport",
            },
            new()
            {
                Title = "Historic Spa Retreat in Bad Kissingen",
                Date = DateTime.Now.AddDays(100),
                Description =
                    "Restorative stay in the UNESCO-listed spa town of Bad Kissingen, famous for its mineral springs.",
                Category = "wellness",
                City = "Bad Kissingen",
                Country = "Germany",
                Duration = 6,
                Price = 3200m,
                Venue = "Bad Kissingen Spa Resort, Bad Kissingen, Germany",
                Latitude = 50.2000,
                Longitude = 10.1500,
                DeparturePlace = "Frankfurt Airport",
            },
        };

        context.Activities.AddRange(activities);

        await context.SaveChangesAsync();
    }
}
