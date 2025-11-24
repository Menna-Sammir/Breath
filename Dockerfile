FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY ./out .

RUN chmod +x API.dll

EXPOSE 80

ENTRYPOINT ["dotnet", "API.dll"]
