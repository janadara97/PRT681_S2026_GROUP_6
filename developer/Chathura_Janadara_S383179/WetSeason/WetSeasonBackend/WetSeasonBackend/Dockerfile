# Stage 1: SDK image - has the compiler/tooling. Named "build" so
# docker-compose.yml can target it directly and run `dotnet watch run`
# against the SDK instead of the slim final image.
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY WetSeasonBackend.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /app/publish

# Stage 2: runtime-only image for the actual production container -
# no SDK, just what's needed to run the published DLL.
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "WetSeasonBackend.dll"]
