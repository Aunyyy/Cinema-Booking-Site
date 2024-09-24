from django.contrib import admin
from .models import Movie, Seat

# Register your models here.

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('uid', 'title', "backdrop_path", "poster_path", 'movie_id', 'release_date', 'overview')

@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('movie', "booked_by", 'seat_number')