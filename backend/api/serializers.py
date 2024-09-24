from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Movie, Seat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password" : {"write_only" : True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["uid", "title", "movie_id", "backdrop_path", "poster_path", "release_date", "overview"]

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ["seat_number", "movie", "booked_by"]
        extra_kwargs = {"movie" : {"read_only" : True}, "user" : {"read_only" : True}}
    
    def create(self, validated_data):
        seat = Seat.objects.create(**validated_data)
        return seat
