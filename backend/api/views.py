from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer, MovieSerializer, SeatSerializer
from .models import Movie, Seat
from django.shortcuts import get_object_or_404
import requests
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class SeatListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, movie_uid):
        movie = get_object_or_404(Movie, uid=movie_uid)
        seats = Seat.objects.filter(movie=movie)
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_user_seats(self, request):
        seats = Seat.objects.filter(booked_by=self.request.user)
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, movie_uid):
        movie = get_object_or_404(Movie, uid=movie_uid)
        seats = request.data.get('seat_numbers', [])

        for seat in seats:
            Seat.objects.get_or_create(
                seat_number=seat,
                movie= movie,
                booked_by = self.request.user
            )
        return Response(status=status.HTTP_201_CREATED)

class SeatDelete(generics.DestroyAPIView):
    serializer_class = SeatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        movie = self.request.movie
        return Seat.objects.filter(movie=movie)

def fetch_movies_store():
    TMDB_API_KEY = "ADD_YOUR_KEY_HERE"
    url = "https://api.themoviedb.org/3/discover/movie?api_key=" + TMDB_API_KEY + "&adult=false&language=en-US&page=1&sort_by=popularity.desc"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWE0OGIyMmZmYjE0ODdjMTkxYzg2NWMxZWZlYzAyYSIsIm5iZiI6MTcyNDY0OTk3Ni43NTE0NTksInN1YiI6IjY2Y2MwOTllNDhmNGRlOGJmNzBlYzU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EQLYzSENNOfk8B2UyPUqwO6ES8jC_mx5pjIemf66b9w"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        movies_data = response.json().get("results", [])
        for movie_data in movies_data:
            movie, created = Movie.objects.get_or_create(
                movie_id= movie_data["id"],
                defaults={
                    "title":movie_data["title"],
                    "overview": movie_data["overview"],
                    "movie_id": movie_data["id"],
                    "backdrop_path": movie_data["backdrop_path"],
                    "poster_path": movie_data["poster_path"],
                    "release_date": movie_data["release_date"]
                }
            )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_movies(request):
    if not Movie.objects.exists():
        fetch_movies_store()
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)
